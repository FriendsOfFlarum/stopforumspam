import app from 'flarum/app';
import StopForumSpamSettingsModal from './components/StopForumSpamSettingsModal'

app.initializers.add('reflar-stopforumspam', () => {
    app.extensionSettings['reflar-stopforumspam'] = () => app.modal.show(new StopForumSpamSettingsModal());
});
