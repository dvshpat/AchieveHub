// Working MCP server with MongoDB
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://swaraj0:IfnZor76MBAztRyb@cluster0.2st4nrh.mongodb.net/AchieveHub?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'AchieveHub';

console.error('[working] Starting server...');

let client;
let db;
let users;
let certificates;

// Connect to MongoDB
try {
  client = new MongoClient(MONGO_URI);
  await client.connect();
  console.error('[working] Connected to MongoDB');
  
  db = client.db(DB_NAME);
  users = db.collection('users');
  certificates = db.collection('certificates');
} catch (error) {
  console.error('[working] MongoDB connection failed:', error.message);
  process.exit(1);
}

// Simple MCP protocol implementation
process.stdin.on('data', (data) => {
  try {
    const message = JSON.parse(data.toString());
    console.error('[working] Received:', message);
    
    if (message.method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'working-mongo-server',
            version: '0.1.0'
          }
        }
      };
      console.log(JSON.stringify(response));
    }
    
    if (message.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          tools: [
            {
              name: 'findUser',
              description: 'Find a user by name',
              inputSchema: {
                type: 'object',
                properties: {
                  name: { type: 'string' }
                },
                required: ['name']
              }
            },
            {
              name: 'addUser',
              description: 'Add a new user',
              inputSchema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' }
                },
                required: ['name', 'email']
              }
            },
            {
              name: 'findCertificatesByUSN',
              description: 'Find all certificates for a user by their USN (University Seat Number)',
              inputSchema: {
                type: 'object',
                properties: {
                  usn: { type: 'string' }
                },
                required: ['usn']
              }
            }
          ]
        }
      };
      console.log(JSON.stringify(response));
    }
    
    if (message.method === 'tools/call') {
      const { name, arguments: args } = message.params;
      
      if (name === 'findUser') {
        users.findOne({ name: args.name }).then(doc => {
          const response = {
            jsonrpc: '2.0',
            id: message.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(doc)
                }
              ]
            }
          };
          console.log(JSON.stringify(response));
        });
      }
      
      if (name === 'addUser') {
        users.insertOne({ 
          name: args.name, 
          email: args.email, 
          createdAt: new Date() 
        }).then(res => {
          const response = {
            jsonrpc: '2.0',
            id: message.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: `Inserted ID: ${res.insertedId}`
                }
              ]
            }
          };
          console.log(JSON.stringify(response));
        });
      }
      
      if (name === 'findCertificatesByUSN') {
        certificates.find({ usn: args.usn }).toArray().then(docs => {
          const response = {
            jsonrpc: '2.0',
            id: message.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(docs, null, 2)
                }
              ]
            }
          };
          console.log(JSON.stringify(response));
        });
      }
    }
  } catch (error) {
    console.error('[working] Error:', error);
  }
});

console.error('[working] Server started');
