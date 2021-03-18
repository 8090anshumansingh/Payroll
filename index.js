const express = require("express");
const app = express();
const mysql = require("mysql");
const ejs = require("ejs");

const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anshuman",
  database: "payroll",
  multipleQueries: true,
});

con.connect(function (err) {
  if (!err) {
    console.log("Connected to mySql Server with dbms");
  } else {
    console.log(err);
  }
});

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/createEmployee", function (req, res) {
  con.query(
    "create table Employee (EmpId int,RoleId int,DeptId int, EmpName varchar(30),Address varchar(255),phone varchar(20),email varchar(20),password varchar(20), primary key(EmpId),foreign key(RoleId) references Role(RoleId),foreign key(DeptId) references Department(DeptId))",
    function (err, result) {
      if (!err) {
        console.log("employee Table Created");
      } else {
        console.log(err);
      }
    }
  );
});
app.get("/createRole", function (req, res) {
  con.query(
    "create table Role (RoleId int, RollName varchar(30),RoleDesc varchar(255), primary key(RoleId))",
    function (err, result) {
      if (!err) {
        console.log("role Table Created");
      } else {
        console.log(err);
      }
    }
  );
});
app.get("/createSalary", function (req, res) {
  con.query(
    "create table Salary (SalaryId int,RoleId int, Ammout int,tax int,bonus int,salary_date varchar(20), primary key(SalaryId),foreign key (RoleId) references Role(RoleId))",
    function (err, result) {
      if (!err) {
        console.log("salary Table Created");
      } else {
        console.log(err);
      }
    }
  );
});
app.get("/createDept", function (req, res) {
  con.query(
    "create table Department (DeptId int, DepartmentName varchar(30), primary key(DeptId))",
    function (err, result) {
      if (!err) {
        console.log("dept Table Created");
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/insertEmployee", function (req, res) {
  var sql = "INSERT INTO Employee VALUES ?";
  var values = [
    [1, 1, 1, "Tom", "34 downstreet NYC", "4838293282", "1@gmail.com", "abc"],
    [2, 9, 1, "Jerry", "36 bakerstreet RI", "9373627222", "2@gmail.com", "abc"],
    [3, 8, 1, "Peter", "37 pinkstreet CL", "9383617173", "3@gmail.com", "abc"],
    [
      4,
      3,
      2,
      "Tony",
      "10880 malibu point NY",
      "98372919191",
      "4@gmail.com",
      "abc",
    ],
    [5, 6, 3, "stefen", "39  brooklyn", "4897738292", "5@gmail.com", "abc"],
    [
      6,
      6,
      4,
      "Pepper pots",
      "40 stark tower NY",
      "98527183738",
      "6@gmail.com",
      "abc",
    ],
    [
      7,
      5,
      4,
      "Chris",
      "41 downstreet asguard",
      "95474483783",
      "7@gmail.com",
      "abc",
    ],
    [
      8,
      8,
      5,
      "Loki",
      "42 upstreet asguard",
      "4838293282",
      "8@gmail.com",
      "abc",
    ],
    [
      9,
      7,
      1,
      "Bruce banner",
      "kolkata India",
      "4838293282",
      "9@gmail.com",
      "abc",
    ],
    [
      10,
      2,
      3,
      "Bruce wayne",
      "wayne tower gotham",
      "9376272829",
      "10@gmail.com",
      "abc",
    ],
    [
      11,
      5,
      4,
      "Natasha",
      "34 downstreet NYC",
      "93873728282",
      "11@gmail.com",
      "abc",
    ],
    [
      12,
      7,
      5,
      "Clint",
      "36 hawkeyestreet NYC",
      "9998293282",
      "12@gmail.com",
      "abc",
    ],
    [
      13,
      8,
      5,
      "Thanos",
      "45 downstreet NYC",
      "9999793282",
      "13@gmail.com",
      "abc",
    ],
    [
      14,
      4,
      2,
      "Steve",
      "40 paststreet queens",
      "9938293282",
      "14@gmail.com",
      "abc",
    ],
  ];
  con.query(sql, [values], function (err, result) {
    if (!err) {
      res.send("Values inserted into Employee");
    } else {
      console.log(err);
    }
  });
});

app.get("/insertRoles", function (req, res) {
  var sql = "INSERT INTO Role VALUES ?";
  var values = [
    [1, "Admin", "Admin of database"],
    [2, "CFO", "chief funding officer of company"],
    [3, "CTO", "chief tecnical officer of company"],
    [4, "CEO", "chief executive officer of company"],
    [5, "HR", "head of Department"],
    [6, "Product manager", "head of products section"],
    [7, "Senior developer", "senior developer in company"],
    [8, "Junior developer", "Junior developer in company"],
    [9, "Data analyst", "Data analyst of company"],
  ];
  con.query(sql, [values], function (err, result) {
    if (!err) {
      res.send("Values inserted into Role");
    } else {
      console.log(err);
    }
  });
});
app.get("/insertSalary", function (req, res) {
  var sql = "INSERT INTO salary VALUES ?";
  var values = [
    [1, 4, 50, 15, 5, 1],
    [2, 1, 40, 15, 5, 1],
    [3, 2, 40, 15, 5, 1],
    [4, 3, 30, 15, 5, 1],
    [5, 5, 25, 15, 5, 1],
    [6, 6, 20, 15, 5, 1],
    [7, 8, 15, 15, 5, 1],
    [8, 9, 18, 15, 5, 1],
    [9, 7, 21, 15, 5, 1],
  ];

  con.query(sql, [values], function (err, result) {
    if (!err) {
      res.send("Values inserted into salary");
    } else {
      console.log(err);
    }
  });
});
app.get("/insertDepartments", function (req, res) {
  var sql = "INSERT INTO Department VALUES ?";
  var values = [
    [1, "Production"],
    [2, "Research and development"],
    [3, "Marketing"],
    [4, "Product web development"],
    [5, "Account and Finance"],
  ];
  con.query(sql, [values], function (err, result) {
    if (!err) {
      res.send("Values inserted into Role");
    } else {
      console.log(err);
    }
  });
});
var rolenames = [];
var deptnames = [];
var salaryDetails = [];
var ids = [];
app.post("/login", function (req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  var sql = "select * from employee  where email=? AND password=? ";
  con.query(sql, [userEmail, userPassword], function (err, results) {
    if (err) {
      console.log(err);
    } else {
      if (results[0].RoleId === 1) {
        // console.log("Admin");

        con.query("select RollName from role ", function (error5, res5) {
          res5.forEach(function (rolename) {
            rolenames.push(rolename);
          });
        });

        con.query("select DepartmentName from department ", function (
          error6,
          res6
        ) {
          res6.forEach(function (deptname) {
            deptnames.push(deptname);
          });
        });
        con.query("select * from salary", function (error8, res8) {
          res8.forEach(function (id) {
            ids.push(id.RoleId);
          });
        });

        con.query("select Ammout,tax,bonus from salary ", function (
          error7,
          res7
        ) {
          var sql3 = "select * from employee";
          con.query(sql3, function (error4, res4) {
            res.render("admin", {
              employees: res4,
              rolenames: rolenames,
              deptnames: deptnames,
              salaryDetails: res7,
              ids: ids,
            });
          });
        });
      } else {
        var sql1 = "select RollName from role where RoleId=?";
        con.query(sql1, [results[0].RoleId], function (error, res1) {
          var sql2 = "select DepartmentName from department where DeptId=?";
          con.query(sql2, [results[0].DeptId], function (error2, res2) {
            var sql3 = "select * from salary where RoleId=?";
            con.query(sql3, [results[0].RoleId], function (error3, res3) {
              res.render("profile", {
                profileName: results[0].EmpName,
                profileAddress: results[0].Address,
                profilePhone: results[0].phone,
                profileEmail: results[0].email,
                profileRole: res1[0].RollName,
                profileDepartment: res2[0].DepartmentName,
                profileSalary: res3[0].Ammout,
                profileTax: res3[0].tax,
                profileBonus: res3[0].bonus,
                profileSalaryDate: res3[0].salary_date,
              });
            });
          });
        });
      }
    }
  });
});

app.get("/login", function (req, res) {
  con.query("select RollName from role ", function (error50, res50) {
    res50.forEach(function (rolename) {
      rolenames.push(rolename);
    });
  });

  con.query("select DepartmentName from department ", function (
    error60,
    res60
  ) {
    res60.forEach(function (deptname) {
      deptnames.push(deptname);
    });
  });
  con.query("select * from salary", function (error80, res80) {
    res80.forEach(function (id) {
      ids.push(id.RoleId);
    });
  });

  con.query("select Ammout,tax,bonus from salary ", function (error70, res70) {
    var sql30 = "select * from employee";
    con.query(sql30, function (error40, res40) {
      res.render("admin", {
        employees: res40,
        rolenames: rolenames,
        deptnames: deptnames,
        salaryDetails: res70,
        ids: ids,
      });
    });
  });
});

app.get("/update/:id", function (req, res) {
  var requestedId = req.params.id;
  res.render("update", { requestedId: requestedId });
});
app.post("/updateinfo/:eid", function (req, res) {
  con.query(
    "select RoleId from role where RollName=?",
    req.body.roles,
    function (error10, res10) {
      con.query(
        "update employee set RoleId=? where EmpId=?",
        [res10[0].RoleId, req.params.eid],
        function (error11, res11) {
          if (error11) {
            console.log(error11);
          } else {
            console.log("Role updated");
          }
        }
      );
    }
  );

  con.query(
    "select DeptId from department where DepartmentName=?",
    req.body.departments,
    function (error12, res12) {
      con.query(
        "update employee set DeptId=? where EmpId=?",
        [res12[0].DeptId, req.params.eid],
        function (error13, res13) {
          if (error13) {
            console.log(error13);
          } else {
            console.log("dept value updated");
          }
        }
      );
    }
  );

  con.query(
    "update employee set Address=?,phone=?,email=? where EmpId=?",
    [req.body.Address, req.body.phone, req.body.email, req.params.eid],
    function (error14, res14) {
      if (error14) {
        console.log(error14);
      } else {
        res.redirect("/login");
      }
    }
  );
});

app.listen(3000, function (req, res) {
  console.log("server open on localhost 3000");
});
