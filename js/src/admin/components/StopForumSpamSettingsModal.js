import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class StopForumSpamSettingsModal extends SettingsModal {
    className() {
        return 'StopForumSpamSettingsModal Modal--small';
    }

    title() {
        return 'StopForumSpam Settings';
    }


    form() {
        return [
            <div className="Form-group">
                {Switch.component({
                    state: this.setting('sfs.username', 0)(),
                    onchange: this.setting('sfs.username', 1),
                    children: 'Username spam check',
                })}
            </div>,
            <div className="Form-group">
                {Switch.component({
                    state: this.setting('sfs.ip', 0)(),
                    onchange: this.setting('sfs.ip', 1),
                    children: 'IP spam check',
                })}
            </div>,
            <div className="Form-group">
                {Switch.component({
                    state: this.setting('sfs.email', 0)(),
                    onchange: this.setting('sfs.email', 1),
                    children: 'Email spam check',
                })}
            </div>,

            <div className="helpText">
                <p>This is the number of spam reports between all enabled checks that will trip the spam filter</p>
                <p>Ex: If the email has 1 hit, and the ip has 2 hits, there will be 3 hits in total. If the threshold is
                    set to 3 or less it will prevent the registration.</p>
            </div>,

            <div className="Form-group">
                <label>Threshold</label>
                <input className="FormControl" bidi={this.setting('sfs.frequency')}/>
            </div>
        ];
    }
}