// By using export default, we can import this as a component into another JS file, so we don't have to call multiple files inside of our HTML
// IMPORTANT: This will only work on a server and not by opening the HTML file in your browser
export default class Stopwatch {
    constructor(display, laps) {
        this.display = display;
        this.laps = laps;
        this.running = false;
        this.ms = 0;
        this.sec = 0;
        this.min = 0;
    }

    run() {
        this.ms++;

        if (this.ms === 100) {
            this.ms = 0;
            this.sec++;
        }
        if (this.sec === 60) {
            this.sec = 0;
            this.min++;
        }
        this.output(this.getTime());
    }

    start() {
        // Set interval will call the run function 100 times in a second
        // Set interval produces an 'is not a function' error while using it in a class, therefore we need to bind it to this class
        if (!this.running) {
            this.running = setInterval(this.run.bind(this), 10);
        }
    }

    stop() {
        clearInterval(this.running);
        this.running = false;
    }

    lap() {
        // This creates the current UNIX timestamp, which will serve as our ID for each lap. By doing so, we can tell exactly when the entry was addded
        let timestamp = Math.floor(Date.now() / 1000);
        // Save the current time (lap) into the local storage
        localStorage.setItem(timestamp, this.getTime());

        // Output nodes for our laps
        let node = document.createElement('p');
        node.setAttribute('class', 'text-light text-center');
        let textnode = document.createTextNode(localStorage.getItem(timestamp));
        node.appendChild(textnode);
        this.laps.appendChild(node);
    }

    clearStopwatch() {
        // This will clear the laps output
        while (this.laps.lastChild){
            this.laps.removeChild(this.laps.lastChild);
        }
        
        // This will reset the timer and output it back as (00:00:00)
        this.reset();
        this.output(this.getTime());

        // This will clear the local storage
        localStorage.clear();

        // This will stop the stopwatch
        this.stop();
    }

    reset() {
        this.ms = 0; this.sec = 0; this.min = 0;
    }

    getTime() {
        // This will format our time output (00:00:00). Using the modern JS syntax with ternary operators and template literals
        return `${this.min < 10 ? '0' + this.min : this.min}:${this.sec < 10 ? '0' + this.sec : this.sec}:${this.ms < 10 ? '0' + this.ms : this.ms}`;
    }

    output(time) {
        this.display.textContent = time;
    }
}