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

    static getusers() {

        return db.execute("SELECT  *  FROM cal2009.history LEFT JOIN cal2009.aws2 ON cal2009.aws2.userid = cal2009.history.userid GROUP BY cal2009.aws2.userid HAVING count(cal2009.aws2.number) >= 11")
    }
    static getusers_de({ department= '' }) {

        return db.execute("SELECT * FROM cal2009.history where department = ?",[department])
    }

    static getall({ USERID = '' }) {

        return db.execute("SELECT cal2009.history.userid,cal2009.loginqt.password,title_name, name, lastname, nickname, phone, email, department,cal2009.history.position FROM cal2009.loginqt LEFT JOIN cal2009.history ON cal2009.loginqt.userid = cal2009.history.userid WHERE cal2009.loginqt.userid = ?", [USERID])
    }

    static insertUser({ USERID = '', PASSWORD = '',position=''}) {

        return db.execute('INSERT INTO cal2009.loginqt (userid, password,position) VALUES (?,?,?)',
            [USERID, PASSWORD,position])
    }

    static updateUser({ USERID = '', PASSWORD = ''}) {

        return db.execute('UPDATE cal2009.loginqt SET  password=? WHERE userid=?',
            [ PASSWORD,USERID])
    }

    static insertHistory({ userid='',title_name='', name='', lastname='', nickname='', phone='', email='', department='',position='' }) {

        return db.execute('INSERT INTO cal2009.history (userid,title_name, name, lastname, nickname, phone, email, department,position) VALUES (?,?,?,?,?,?,?,?,?)',
            [userid,title_name, name, lastname, nickname, phone, email, department,position])
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

    static getAws1({ userid = '', year = '', part = '', number = ''}) {
       
        return db.execute('SELECT * FROM cal2009.aws1 WHERE userid=? and year = ? and part = ? and number= ?',
            [userid, year, part, number])
    }

    static insertAws1({ userid = '', answer = '', year = '', part = '', number = '', videoURL = '', date = '' }) {

        return db.execute('INSERT INTO cal2009.aws1 (userid, answer, year, part,number,videoURL,date) VALUES (?,?,?,?,?,?,?)',
            [userid, answer, year, part, number, videoURL, date])
    }
    static UPDATEAws1({ userid = '', answer = '', year = '', part = '', number = '', videoURL = '', date = '' }) {
        return db.execute('UPDATE cal2009.aws1 SET  answer=?,  videoURL=?,date=? WHERE userid=? and year=? and part=? and number=?',
            [answer, videoURL, date, userid, year, part, number])


    }


    static getAws2({ userid = '', year = '', part = '', number = ''}) {
       
        return db.execute('SELECT * FROM cal2009.aws2 WHERE userid=? and year = ? and part = ? and number= ?',
            [userid, year, part, number])
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