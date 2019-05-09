use portfolio;
db.dropDatabase();

db.stocks.insertMany([
  {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    numberOfShares: 30,
    AVGPrice: 197
  },

  {
    symbol: "T",
    companyName: "AT&T Inc.",
    numberOfShares: 100,
    AVGPrice: 29
  },

  {
    symbol: "ATVI",
    companyName: "Activision Blizzard Inc",
    numberOfShares: 60,
    AVGPrice: 52
  }
]);
