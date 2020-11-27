const cp = require("child_process")

exports.run = async (bot, msg, args) => {

    if (msg.author.id !== '611396886418685982') return;

    const args1 = msg.content.split(' ').slice(1); 
    const cmd = args1.join(' ');

    if (!cmd) return
    const start = Date.now();
    cp.exec(cmd, {
        timeout: 10000
    }, (err, stdout, stderr) => {
        if (err) {
            if (stderr.length > 2048) {
                console.log("------- Result -------\n" + stderr + "\n----------------------")
                return msg.channel.send(
                    "Error too long, check logs."
                );
            }
            if ((err.signal = "SIGTERM")) {
                console.log("------- Result -------\n" + stdout + "\n----------------------")
                return msg.channel.send("An error occurred. Check logs.");
            }
        }
        if (stdout.length > 2048) {
            console.log("------- Result -------\n" + stdout + "\n----------------------");
            return msg.channel.send("Result too long, check logs.");
        }
        console.log("------- Result -------\n" + stdout + "\n----------------------")
        const duration = milis(new Date(Date.now() - start).getMilliseconds());
        msg.channel.send(`Executed in ${duration}.\n` + "```yaml\n" + stdout + "```")
    })
}


function milis(ms, delim = ":") {
    const showWith0 = (value) => (value < 10 ? `0${value}` : value);
    const days = showWith0(Math.floor((ms / (1000 * 60 * 60 * 24)) % 60));
    const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 24));
    const minutes = showWith0(Math.floor((ms / (1000 * 60)) % 60));
    const seconds = showWith0(Math.floor((ms / 1000) % 60));
    if (parseInt(days)) return `${days}d`;
    if (parseInt(hours)) return `${hours}h`;
    if (parseInt(minutes)) return `${minutes}min`;
    if (parseInt(seconds)) return `${seconds}s`;
    if (parseInt(ms)) return `${ms}ms`;
}
