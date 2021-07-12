const db = require('../DB/mysql')

class UserModel {
    constructor({ CUSCOD = '', PASSWORD = '', USERID_LINE = '', SDATE = '', ROLE = '', MA = '' }) {
        this.CUSCOD = CUSCOD;
        this.PASSWORD = PASSWORD;
        this.SDATE = SDATE;
        this.ROLE = ROLE;
        this.MA = MA;
        this.USERID_LINE = USERID_LINE;
        this.CREATDATE = new Date();
        this.UPDATEDATE = new Date();


    }

    static getall({ USERID = '' }) {

        return db.execute("SELECT * FROM cal2009.loginqt WHERE userid = ?", [USERID])
    }

    static insertUser({ USERID = '', PASSWORD = '',position=''}) {

        return db.execute('INSERT INTO cal2009.loginqt (userid, password,position) VALUES (?,?,?)',
            [USERID, PASSWORD,position])
    }

    static updateUser({ USERID = '', PASSWORD = ''}) {

        return db.execute('UPDATE cal2009.loginqt SET  password=? WHERE userid=?',
            [ PASSWORD,USERID])
    }

    static getquestion1({ userid = '', year = '', part = '' }) {

        return db.execute("SELECT * FROM cal2009.question1 LEFT JOIN cal2009.aws1 ON cal2009.question1.year = cal2009.aws1.year and cal2009.question1.part = cal2009.aws1.part and cal2009.question1.number = cal2009.aws1.number  WHERE cal2009.aws1.userid = ? and cal2009.aws1.year = ? and cal2009.aws1.part = ? order by cal2009.aws1.number asc"
            , [userid, year, part])
    }

    static getquestion_1({ year = '', part = '' }) {

        return db.execute("SELECT * FROM cal2009.question1 WHERE year = ? and part = ? order by number asc"
            , [year, part])
    }

    static getquestion2({ userid = '', year = '', part = '' }) {

        return db.execute("SELECT * FROM cal2009.question2 LEFT JOIN cal2009.aws2 ON cal2009.question2.year = cal2009.aws2.year and cal2009.question2.part = cal2009.aws2.part and cal2009.question2.number = cal2009.aws2.number  WHERE cal2009.aws2.userid = ? and cal2009.aws2.year = ? and cal2009.aws2.part = ? order by cal2009.aws2.number asc"
            , [userid, year, part])
    }

    static getquestion_2({ year = '', part = '' }) {

        return db.execute("SELECT * FROM cal2009.question2 WHERE year = ? and part = ?"
            , [year, part])
    }

    static insertUserLSFHP_ARMAST({ part = '', number = '', year = '', qt = '' }) {

        return db.execute('INSERT INTO cal2009.question1 (part, number,year,qt) VALUES (?,?,?,?)',
            [part, number, year, qt])
    }

    static insertAws1({ userid = '', answer = '', year = '', part = '', number = '', videoURL = '', date = '' }) {

        return db.execute('INSERT INTO cal2009.aws1 (userid, answer, year, part,number,videoURL,date) VALUES (?,?,?,?,?,?,?)',
            [userid, answer, year, part, number, videoURL, date])
    }
    static UPDATEAws1({ userid = '', answer = '', year = '', part = '', number = '', videoURL = '', date = '' }) {
        return db.execute('UPDATE cal2009.aws1 SET  answer=?,  videoURL=?,date=? WHERE userid=? and year=? and part=? and number=?',
            [answer, videoURL, date, userid, year, part, number])


    }


    static insertAws2({ userid = '', answer = '', year = '', part = '', number = '', videoURL = '', date = '' }) {

        return db.execute('INSERT INTO cal2009.aws2 (userid, answer, year, part,number,videoURL,date) VALUES (?,?,?,?,?,?,?)',
            [userid, answer, year, part, number, videoURL, date])
    }
    static UPDATEAws2({ userid = '', answer = '', year = '', part = '', number = '', videoURL = '', date = '' }) {
        return db.execute('UPDATE cal2009.aws2 SET  answer=?,  videoURL=?,date=? WHERE userid=? and year=? and part=? and number=?',
            [answer, videoURL, date, userid, year, part, number])


    }

}



module.exports = UserModel;