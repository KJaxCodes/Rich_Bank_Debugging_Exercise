As a systems engineer 🧑‍💻 in the Rich Bank 🏦, you know:

- 📋 Each account has the ID(positive integer), the owner(non - empty string), and the balance(non - negative number).
- 🧐 Account holders can view their accounts using their ID (See: `getAccountById`).
- 🥳 Customers can create a new account with an ID and their name with 0 balance(See: `createAccount`).
- 💸 Account holders can deposit money to their accounts with their ID if the amount to be deposited is greater than 0, of course!(See: `depositMoney`).
- 💰 Account holders can withdraw money from their accounts with their ID if the amount to be withdrawn is greater than 0, of course!(See: `withdrawMoney`).
- 🛫 Account holders can transfer their money to another account holder's account using IDs if the amount to be transferred is greater than 0, of course! (See: `transferMoney`).

The starter code is full of bugs.Your task is fixing the bugs using the knowledge above.


const accounts = [
    { id: 1, owner: "Alice", balance: 500 },
    { id: 2, owner: "Bob", balance: 300 }
];

function getAccountById(id) {
    for (const account of accounts) {
        if (account.id === id)  //this should be === to prevent errors
        {
            return account;
        }
    }
}

function createAccount(newAccountId, newAccountOwner) {
    const account = getAccountById(newAccountId);  //define const inside of function to have access to it and check for existing ID

    if (account) {
        throw new Error("Account already exists. Provide new account ID"); //checks for existing ID
    }

    if (!Number.isInteger(newAccountId) || newAccountId <= 0)     //checks that newAccountId is a valid number / positive integer
    {
        throw new Error("Account ID is not valid, must be a positive integer")
    }

    if (typeof newAccountOwner !== 'string' || newAccountOwner.trim() === '')     //checks that newAccountOwner is a non-empty string
    {
        throw new Error("Invalid Account Owner. Account Owner must be a non-empty string")
    }

    accounts.push(
        {
            id: newAccountId,
            owner: newAccountOwner,
            balance: "0"
        }
    );
}

function depositMoney(accountId, amount) {
    const account = getAccountById(accountId);

    if (!account) {
        throw new Error("Account not found");
    }

    if (!Number.isFinite(amount) || amount <= 0)  //checks that amount is a number greater than 0
    {
        throw new Error("Invalid amount. Amount must be a number greater than 0")
    }

    account.balance += amount;
}

function withdrawMoney(accountId, amount) {
    const account = getAccountById(accountId);

    if (!account) {
        throw new Error("Account not found.");
    }

    if (!Number.isFinite(amount) || amount <= 0) //checks that amount is a number greater than 0
    {
        throw new Error("Invalid value for withdrawal amount: The amount must be a finite number greater than 0.");
    }

    if (amount > account.balance)  //checks that amount is available to be withdrawn
    {
        throw new Error("Insufficient funds. Choose an amount that is less than or equal to the balance")
    }

    account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount) {
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);

    if (!fromAccount) {
        throw new Error("Source account not found.");
    }

    if (!toAccount) {
        throw new Error("Recipient account not found.");  //checks that toAccountId is valid
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
    }

    if (amount > fromAccount.balance)  //checks that amount is available to be withdrawn from the source account
    {
        throw new Error("Insufficient funds. Choose an amount that is less than or equal to the balance")
    }

    fromAccount.balance -= amount;  //subtracts amount from source account
    toAccount.balance += amount;  //adds amount to recipient account

}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)   

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
