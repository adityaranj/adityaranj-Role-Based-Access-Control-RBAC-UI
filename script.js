let users = [];
let roles = [];

// Mock user ID generator
let userId = 1;

// Function to open the user modal with smooth transition
function openUserModal() {
  populateRoleDropdown();
  const userModal = document.getElementById('user-modal');
  userModal.classList.add('show');
}

// Function to open the role modal with smooth transition
function openRoleModal() {
  const roleModal = document.getElementById('role-modal');
  roleModal.classList.add('show');
}

// Function to close any modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
}

// Save new user details
function saveUser() {
  const name = document.getElementById('user-name').value.trim();
  const role = document.getElementById('user-role').value;
  const status = document.getElementById('user-status').value;

  if (!name) {
    alert('Name cannot be empty!');
    return;
  }

  users.push({ id: userId++, name, role, status });
  updateUserTable();
  closeModal('user-modal');
  clearUserModalInputs();
}

// Save new role details
function saveRole() {
  const name = document.getElementById('role-name').value.trim();
  const permissions = Array.from(
    document.querySelectorAll('#permissions-container input:checked')
  ).map(input => input.value);

  if (!name) {
    alert('Role name cannot be empty!');
    return;
  }

  if (roles.find(role => role.name === name)) {
    alert('Role name must be unique!');
    return;
  }

  roles.push({ name, permissions });
  updateRoleTable();
  closeModal('role-modal');
  clearRoleModalInputs();
}

// Update the user table dynamically
function updateUserTable() {
  const tbody = document.querySelector('#user-table tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role || 'None'}</td>
      <td>${user.status}</td>
      <td>
        <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Update the role table dynamically
function updateRoleTable() {
  const tbody = document.querySelector('#role-table tbody');
  tbody.innerHTML = '';
  roles.forEach(role => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${role.name}</td>
      <td>${role.permissions.length > 0 ? role.permissions.join(', ') : 'None'}</td>
      <td>
        <button class="btn-delete" onclick="deleteRole('${role.name}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Delete a user by ID
function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    users = users.filter(user => user.id !== id);
    updateUserTable();
  }
}

// Delete a role by name
function deleteRole(name) {
  if (confirm('Are you sure you want to delete this role?')) {
    roles = roles.filter(role => role.name !== name);
    updateRoleTable();
  }
}

// Populate the dropdown with available roles
function populateRoleDropdown() {
  const dropdown = document.getElementById('user-role');
  dropdown.innerHTML = roles.length
    ? roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('')
    : `<option value="">No roles available</option>`;
}

// Clear inputs in the user modal
function clearUserModalInputs() {
  document.getElementById('user-name').value = '';
  document.getElementById('user-role').value = '';
  document.getElementById('user-status').value = 'Active';
}

// Clear inputs in the role modal
function clearRoleModalInputs() {
  document.getElementById('role-name').value = '';
  document.querySelectorAll('#permissions-container input').forEach(input => {
    input.checked = false;
  });
}