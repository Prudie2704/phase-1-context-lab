/* Your Code Here */
const helpers = require('./helpers')

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(row => createEmployeeRecord(row))
  }
  
  function createTimeInEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ')
    this.timeInEvents.push({
      type: 'TimeIn',
      date,
      hour: parseInt(hour, 10)
    })
    return this
  }
  
  function createTimeOutEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ')
    this.timeOutEvents.push({
      type: 'TimeOut',
      date,
      hour: parseInt(hour, 10)
    })
    return this
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    const wages = datesWorked.map(date => wagesEarnedOnDate(employee, date))
    return wages.reduce((total, wage) => total + wage, 0)
  }
  
  function calculatePayroll(employees) {
    const wages = employees.map(employee => allWagesFor(employee))
    return wages.reduce((total, wage) => total + wage, 0)
  }
  
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
    findEmployeeByFirstName
  }
  


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


