const accounts= [

    {accountNo:123,balance:500,type:Saving},
    {accountNo:222,balance:2500,type:Saving},
    {accountNo:333,balance:3500,type:Saving},
    {accountNo:444,balance:4500,type:Saving},
    

    
]
function deposit(accountNo, amount) {
    const account= accounts.find(acc => acc.accountNo===accountNo);
    account.balance += amount;

}

function withdraw(accountNo, amount) {
    const account= accounts.find(acc => acc.accountNo===accountNo);
    account.balance -= amount;
}

function add(accountNo,balance, type){
    accounts.push({accountNo,balance, type})

}
function getaccount(accountNo){
    return accounts.find(acc => acc.accountNo===accountNo);
    
}

function deleteAccount(accountNo){
    const account= accounts.find(acc => acc.accountNo===accountNo);
    accounts.slice(account);
}
function sumBalance() {
    return accounts.reduce((sum,a) => sum+a.balance,0)
}
function avgBalance() {
    return sumBalance()/accounts.length
}
function distributeBenefit(benefitPercentage) {
   accounts.forEach(acc => {
    if(acc.type === "Saving"){
        acc.balance += acc.balance*(benefitPercentage/100); 
    }
   })   
}
function deductFee(monthlyFee){
    accounts.forEach(acc => {
        if(acc.type === "Saving"){
            acc.balance -= monthlyFee; 
        }
       }) 
}
function tojason(){
    return JSON.stringify(accounts);
}
function fromJson(accountJSON){
    return JSON.parse(accountJSON);
}


    
