const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(role, userId = null) {
  if (role === 'admin') {
    can('manage', 'all');
    can('delete', 'Project');
  } else if (role === 'pm') {
    can('create', 'Project');
    can('read', 'Project');
    can('delete', 'Project');
    can('create', 'Task');
    can('update', 'Task');
    can('read', 'User');
    can('update', 'Team');
  } else if (role === 'developer') {
    can('read', 'Task');
    can('update', 'Task', { assignedTo: userId });
    can('read', 'Project');
  }

  return build();
}

module.exports = defineAbilitiesFor;