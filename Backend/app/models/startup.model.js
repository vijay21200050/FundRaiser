module.exports = (sequelize, Sequelize) => {
    const Startup = sequelize.define("startups", {
      startupname: {
        type: Sequelize.STRING
      },
      startupsummary: {
        type: Sequelize.STRING
      },
      startupdesc: {
        type: Sequelize.STRING
      },
      startupfunds: {
        type: Sequelize.INTEGER
      },
      fundsraised: {
        type: Sequelize.INTEGER
      }
    });
  
    return Startup;
  };
  