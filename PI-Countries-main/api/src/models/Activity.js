const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        difficulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: false,
        },


    }, { timestamps: false });
};






// module.exports = (sequelize) => {
//     sequelize.define('activity,{
//             id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//         name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//         description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//         startDate: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//         endDate: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     )
// };