Vue.component('editor', {
    props: ['source'],
    template: '#edit-template',
    data: () => ({
        timeline: {}
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
                "date": "2000-01-01",
                "headline": "",
                "image": "/assets/images/",
                "description": ""
            });
        },
        deleteEvent: function(index) {
            this.timeline.events.splice(index, 1);
        },
        saveTimeline: function() {

            if (this.timeline.events && this.timeline.events.length){
                this.timeline.events.sort(function(a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
            }

            output = JSON.stringify(this.timeline, null, 4);

            axios.post('/save', output)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addSource: function(eventIndex) {
            var sources = this.timeline.events[eventIndex].sources;
            console.log(sources);
            sources.push({
                title: "",
                link: ""
            });
        },
        deleteSource: function(eventIndex, sourceIndex) {
            console.log(eventIndex, sourceIndex);
            this.timeline.events[eventIndex].sources.splice(sourceIndex, 1);
        },
    },
});

new Vue({
  el: '#edit-app',
});
