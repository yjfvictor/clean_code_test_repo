// This file shows the same code after applying ESLint and Prettier fixes
// Following Airbnb JavaScript Style Guide

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

function processUsers(users, role, limit) {
  const result = [];
  let count = 0;

  for (let i = 0; i < users.length; i += 1) {
    if (users[i].role === role && users[i].isActive === true) {
      result.push({
        id: users[i].id,
        name: `${users[i].firstName} ${users[i].lastName}`,
        email: users[i].email,
      });
      count += 1;

      if (count >= limit) {
        break;
      }
    }
  }

  return result;
}

function calculateTotal(items) {
  let total = 0;

  for (let i = 0; i < items.length; i += 1) {
    total += items[i].price * items[i].qty;
  }

  return total;
}

const getUser = (id) => {
  if (!id) {
    throw new Error('ID required');
  }

  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

function validatePassword(pwd) {
  if (pwd.length < 8) {
    return false;
  }

  if (!/[A-Z]/.test(pwd)) {
    return false;
  }

  if (!/[0-9]/.test(pwd)) {
    return false;
  }

  return true;
}

class UserManager {
  constructor(users) {
    this.users = users;
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(id) {
    this.users = this.users.filter((u) => u.id !== id);
  }

  findUser(id) {
    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }

    return null;
  }
}

const processOrders = (orders, status) =>
  orders
    .filter((order) => order.status === status)
    .map((order) => ({
      id: order.id,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }));

module.exports = {
  processUsers,
  calculateTotal,
  getUser,
  validatePassword,
  UserManager,
  processOrders,
};
