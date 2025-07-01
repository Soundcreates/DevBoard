const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(role, userId = null) {
  const { can, cannot, build } = new AbilityBuilder(Ability);
  if (role === 'admin') {
    can('manage', 'all');
    can('delete', 'Project');
    cannot('assign', 'Task');
    cannot('create', 'Task');
  } else if (role === 'pm') {
    can('create', 'Project');
    can('read', 'Project');
    can('delete', 'Project');
    can('create', 'Task');
    can('update', 'Task');
    can('read', 'User');
    can('update', 'Team');
    can('assign', 'Task');
    can('read', 'Developers');
  } else if (role === 'developer') {
    can('read', 'Task');
    can('update', 'Task', { assignedTo: userId });
    can('read', 'Project');
    can('read', 'Task');
  }

  return build();
}

module.exports = defineAbilitiesFor;