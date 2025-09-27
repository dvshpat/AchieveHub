// controllers/profileController.js
import Profile from "../models/Profile.js";
import axios from "axios";

// ✅ Create/Update Profile
export const saveProfile = async (req, res) => {
  try {
    const { codeforces, codechef, leetcode, github, linkedin, portfolio } = req.body;

    let profile = await Profile.findOne({ owner: req.user._id });

    if (!profile) {
      profile = await Profile.create({
        owner: req.user._id,
        codeforces,
        codechef,
        leetcode,
        github,
        linkedin,
        portfolio,
      });
    } else {
      Object.assign(profile, { codeforces, codechef, leetcode, github, linkedin, portfolio });
      await profile.save();
    }

    res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Fetch & Update Ratings from APIs
export const fetchRatings = async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.user._id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    // Codeforces API
    if (profile.codeforces?.handle) {
      const { data } = await axios.get(
        `https://codeforces.com/api/user.info?handles=${profile.codeforces.handle}`
      );
      profile.codeforces.rating = data.result[0].rating || null;
    }

    // CodeChef API (unofficial scraping endpoint)
    if (profile.codechef?.handle) {
      const { data } = await axios.get(
        `https://codechef-api.vercel.app/${profile.codechef.handle}`
      );
      profile.codechef.rating = data.rating || null;
    }

    // LeetCode API (GraphQL)
    if (profile.leetcode?.handle) {
      const graphqlQuery = {
        query: `
          query {
            userContestRanking(username: "${profile.leetcode.handle}") {
              attendedContestsCount
              rating
              globalRanking
              totalParticipants
              topPercentage
            }
            userContestRankingHistory(username: "${profile.leetcode.handle}") {
              attended
              trendDirection
              problemsSolved
              totalProblems
              finishTimeInSeconds
              rating
              ranking
              contest {
                title
                startTime
              }
            }
          }
        `,
      };

      const { data } = await axios.post("https://leetcode.com/graphql", graphqlQuery, {
        headers: { "Content-Type": "application/json" },
      });

      const contestData = data.data.userContestRanking;
      const solvedData = data.data.userContestRankingHistory || [];

      profile.leetcode.contestRating = contestData?.rating || null;
    //   profile.leetcode.solvedProblems =
    //     solvedData.reduce((acc, cur) => acc + (cur.problemsSolved || 0), 0) || 0;
    }
 // === LeetCode Stats API ===
    if (profile.leetcode?.handle) {
      const { data } = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${profile.leetcode.handle}`
      );

      if (data.status === "success") {
        profile.leetcode.solvedProblems = data.totalSolved || 0;
        // profile.leetcode.contestRating = data.rating || null;
        profile.leetcode.easySolved = data.easySolved || 0;
        profile.leetcode.mediumSolved = data.mediumSolved || 0;
        profile.leetcode.hardSolved = data.hardSolved || 0;
      }
    }


    // GitHub API
    if (profile.github?.username) {
      const { data } = await axios.get(
        `https://api.github.com/users/${profile.github.username}`
      );
      profile.github.repoCount = data.public_repos || 0;
      profile.github.followers = data.followers || 0;
    }

    await profile.save();
    res.json({ message: "Ratings updated", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get profile for a given userId
export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.params.userId });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
