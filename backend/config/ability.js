const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(role, userId = null) {
  if (role === 'admin') {
    can('manage', 'all');
  } else if (role === 'pm') {
    can('read', 'Project');
    can('create', 'Task');
    can('update', 'Task');
    can('read', 'User');
  } else if (role === 'developer') {
    can('read', 'Task');
    can('update', 'Task', { assignedTo: userId });
    can('read', 'Project');
  }

  return build();
}

module.exports = defineAbilitiesFor;