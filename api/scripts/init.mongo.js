db.users.remove({});
db.topics.remove({});
db.counters.remove({});

const initialTopics = [
  {
    _id: uuidv4(),
    name: "Festivals",
    description: "",
    imagePath: "/images/festivals.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Concerts",
    description: "",
    imagePath: "/images/concerts.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Arts",
    description: "",
    imagePath: "/images/arts.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Fashion",
    description: "",
    imagePath: "/images/fashion.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Sports",
    description: "",
    imagePath: "/images/sports.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Pets",
    description: "",
    imagePath: "/images/pets.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Anime",
    description: "",
    imagePath: "/images/anime.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Academic",
    description: "",
    imagePath: "/images/academic.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
  {
    _id: uuidv4(),
    name: "Community",
    description: "",
    imagePath: "/images/community.jpg",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
  },
];

const initialUsers = [
  {
    _id: uuidv4(),
    email: "test1@test.com",
    password: "123",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
    topics: ["sports", "pets"],
    hashtags: ["celebrities", "travel"],
  },
  {
    _id: uuidv4(),
    email: "test2@test.com",
    password: "123",
    created: new Date(),
    lastUpdated: new Date(),
    versionNo: 1,
    topics: ["festivals", "arts"],
    hashtags: ["celebrities", "technology"],
  },
];

db.users.insertMany(initialUsers);
const userCount = db.users.count();
print("Inserted", userCount, "users");

db.counters.remove({ _id: "users" });
db.counters.insert({ _id: "users", current: userCount });

db.users.createIndex({ _id: 1 }, { unique: true });
db.users.createIndex({ email: 1 });
db.users.createIndex({ password: 1 });

db.topics.insertMany(initialTopics);
const topicCount = db.topics.count();
print("Inserted", topicCount, "topics");

db.counters.remove({ _id: "users" });
db.counters.insert({ _id: "users", current: topicCount });

function uuidv4() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
