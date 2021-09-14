import app from 'flarum/admin/app';
import StopForumSpamSettings from './components/StopForumSpamSettings';

app.initializers.add('fof-stopforumspam', () => {
    app.extensionData.for('fof-stopforumspam').registerPage(StopForumSpamSettings);
});
