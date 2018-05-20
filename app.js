const salaryAmount = document.getElementById('amount');
const submit = document.getElementById('submit-button');
const netSal = document.getElementById('net-salary');
const totalTax = document.getElementById('total-tax');
const persAllow = document.getElementById('personal-allowance');
const basRate = document.getElementById('basic-rate');
const hiRate = document.getElementById('high-rate');
const addRate = document.getElementById('additional-rate');
const natIns = document.getElementById('national-insurance');

let grossSalary,
    personalAllowance = 11850,
    netSalary,
    taxableIncome,
    basicRate,
    higherRate,
    additionalRate,
    taxDue;

document.getElementById('salary-form').addEventListener('submit', function(e){
    event.preventDefault();
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateTaxDue, 1000);
    setTimeout(calculateNI, 1001)
    setTimeout(populateField, 1002);       
});

function calculateTaxDue(grossSalary){
    grossSalary = parseInt(salaryAmount.value);
    if (grossSalary > 150000) {
        basicRate = (46351 - personalAllowance) * 0.2;
        higherRate = (150000 - 46351) * 0.4;
        additionalRate = (grossSalary - 150000) * 0.45;
        taxDue = basicRate + higherRate + additionalRate;
    }   else if (grossSalary > 46351){
        basicRate = (46351 - personalAllowance) * 0.2;
        higherRate = (grossSalary - 46351) * 0.4;
        additionalRate = 0;
        taxDue = basicRate + higherRate;
    }   else if (grossSalary > personalAllowance){
        basicRate = (grossSalary - personalAllowance) * 0.2;
        higherRate = 0;
        additionalRate = 0;
        taxDue = basicRate;
    }   else {
        basicRate = 0
        higherRate = 0;
        additionalRate = 0;
        taxDue = 0;
    }
    
    netSalary = (grossSalary - taxDue);
    console.log(grossSalary);
    console.log(netSalary);

      document.getElementById('results').style.display = "block";
    document.getElementById('loading').style.display = 'none';
     return salaryObject = {
        "grossSalary": grossSalary,
        "basicRate": basicRate,
        "higherRate": higherRate,
        "additionalRate": additionalRate,
        "taxDue": taxDue,
        "netSalary": netSalary
    };
}

function calculateNI(grossSalary){
    let weekSal = salaryObject.grossSalary / 52;
    
    if (weekSal > 866.00){
        nIContrib = ((709 * 0.12) + ((weekSal - 866)*0.02))*52;
    } else if (weekSal > 157) {
        nIContrib = (((weekSal  - 157)*0.12) * 52);
    } else {
        nIContrib = 0;
    }

    return nIContrib 
}

function populateField(){
    console.log(salaryObject);
    netSal.value = (salaryObject.netSalary - nIContrib).toFixed(2);
    totalTax.value = salaryObject.taxDue.toFixed(2);
    persAllow.value = personalAllowance.toFixed(2);
    basRate.value = salaryObject.basicRate.toFixed(2);
    hiRate.value = salaryObject.higherRate.toFixed(2);
    addRate.value = salaryObject.additionalRate.toFixed(2);
    natIns.value = nIContrib.toFixed(2);
}