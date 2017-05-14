Vue.component('builder', {
    props: ['source'],
    template: '#builder-template',
    data: () => ({
        timeline: {},
        output: ""
    }),
    created() {
        axios.get(this.source).then(response => {
            this.timeline = response.data
        })
        .catch(e => {
            this.errors.push(e)
        })
    },
    methods: {
        addEvent: function() {
            this.timeline.events.push({
                "date": "1990-01-01",
                "headline": "Enter headline",
                "image": "/assets/images/",
                "description": "Enter description"
            });
        },
        deleteEvent: function(index) {
            this.timeline.events.splice(index, 1);
        },
        saveTimeline: function() {

            console.log("SAVING");

            if (this.timeline.events && this.timeline.events.length){
                this.timeline.events.sort(function(a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
            }

            this.output = JSON.stringify(this.timeline);
        },
        loadTimeline: function() {

            console.log("LOADING");

            if (this.output.length < 1){
                this.timeline = {};
                return;
            }

            this.timeline = JSON.parse(this.output);
        },
        addSource: function(eventIndex) {
            var sources = this.timeline.events[eventIndex].sources;
            console.log(sources);
            if (sources.indexOf('') > 0) {
                return;
            }
            sources.push("");
        },
        deleteSource: function(eventIndex, sourceIndex) {
            console.log(eventIndex, sourceIndex);

            this.timeline.events[eventIndex].sources.splice(sourceIndex, 1);
        },
    },
});

new Vue({
  el: '#builder-app',
});
