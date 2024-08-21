
  Object.defineProperty(Array.prototype, 'shuffle', {
    value: function shuffle() {
        let currentIndex = this.length;
    
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
    
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // And swap it with the current element.
            [this[currentIndex], this[randomIndex]] = [
            this[randomIndex], this[currentIndex]];
        }
        return this;
    },
    enumerable: false
  });