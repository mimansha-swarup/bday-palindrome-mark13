const reverseString = (str) => {
    return str.split("").reverse().join("");
}

const isPalindromeFunc = (str) => {
    const reverse = reverseString(str);
    return reverse === str;
}

const convertDateToString = (date) => {
    var dateStr = { day: "", month: "", year: "" };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr
}


const getAllDateFormat = (date) => {
    const dateStr = convertDateToString(date);

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = +dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]

}


const checkAllPalindrome = (date) => {
    const listOfPalindrome = getAllDateFormat(date);
    var isPalindrome = false;

    for (const oneDateFormat of listOfPalindrome) {
        if (isPalindromeFunc(oneDateFormat)) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome
}

const isLeapYear = (year) => {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

const getNextDate = (date) => {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {

        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }

        } else {
            if (day > 28) {
                day = 1;
                month++;
            }

        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day,
        month,
        year
    }
}
const nextPalindromeDate = (date) => {
    var count = 0;
    var nextDate = getNextDate(date);
    while (true) {
        count++;
        var isPalindrome = checkAllPalindrome(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    //count is keeping track of no of days to next palindrome date
    return [count, nextDate];
}

// const getPrevDate = (date) => {
//     var day = date.day - 1;
//     var month = date.month;
//     var year = date.year;
//     var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//     if (month === 2) {

//         if (isLeapYear(year)) {
//             day = 29;
//             if (day > 29) {
//                 month++;
//             }

//         } else {
//             if (day > 28) {
//                 day = 1;
//                 month++;
//             }

//         }
//     } else {
//         if (day < 1) {

//             day = daysInMonth[month - 1]
//             month--;
//         }
//     }

//     if (month < 1) {
//         month = 12;
//         year--;
//     }

//     return {
//         day,
//         month,
//         year
//     }
// }

const dateInput = document.querySelector("#bday-input");
const showBtn = document.querySelector("#show-btn");
const resultBox = document.querySelector("#result");
const loading = document.querySelector("#loading");

const showBtnClickHandler = () => {
    loading.style.display = "none"
    const bdayStr = dateInput.value;
    if (bdayStr !== '') {
        const dateParts = bdayStr.split('-');
        var date = {
            day: Number(dateParts[2]),
            month: Number(dateParts[1]),
            year: Number(dateParts[0]),
        }
        var isPalindrome = checkAllPalindrome(date);

        if (isPalindrome) {
            resultBox.innerText = "Yay!!! Yout bday is palindrome"

        } else {
            var [count, nextDate] = nextPalindromeDate(date);

            resultBox.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days! 😔`;
        }
    }

}


showBtn.addEventListener('click', () => {
    loading.style.display = "block";
    setTimeout(showBtnClickHandler, 2000);
})