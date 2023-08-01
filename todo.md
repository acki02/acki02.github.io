
ToDo:
Make it nicer looking (naaaah)

added a possible xp workaround made by rick if the xp is off in old.






querys to try

Query for all xp from the school program exluding piscine-js and piscine-go add createdAt for dates

"up" audits given
"down" audits received
query {
  transaction(where: {
    type: { _eq: "up" }
    path: { _like: "%school-curriculum%"
           _nregex: "^/gritlab/school-curriculum/piscine-js/.*"
    }
  })
  {
    type
    path
    objectId
    object {
      name
    }
    amount
    createdAt
  }
}

query {
transaction(where: {
  type: { _eq: "xp"}
  path: { _like: "%school-curriculum%"
 					_nregex: "^/gritlab/school-curriculum/piscine-js/.*"
  }

})
  {
    type
    path
    objectId
    object {
      name
    }
    amount
  }
}


audit -> grade is receivers audit ratio?




https://dev.to/mustapha/how-to-create-an-interactive-svg-donut-chart-using-angular-19eo
