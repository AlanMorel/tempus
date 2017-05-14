Vue.component('timeline', {
    props: ['source'],
    template: '#timeline-template',
    data: () => ({
        timeline: {}
    }),
    created() {
        axios.get(this.source).then(response => {
            this.timeline = response.data
            console.log(this.timeline);
        })
        .catch(e => {
            this.errors.push(e)
        })
    },
    methods: {
        timelineStyles: function() {
            return [
                "background-color:" + this.timeline.secondaryColor + ";",
                "color:" + this.timeline.color + ";"
            ].join('');
        },
        detailsStyles: function() {
            return [
                "background-color:" + this.timeline.primaryColor + ";",
                "color:" + this.timeline.color + ";"
            ].join('');
        },
        lineStyles: function() {
            return [
                "background-color:" + this.timeline.lineColor + ";"
            ].join('');
        },
        eventStyles: function() {
            return [
                "background-color:" + this.timeline.primaryColor + ";"
            ].join('');
        },
        linkStyles: function() {
            return [
                "color:" + this.timeline.color + ";"
            ].join('');
        }
    },
});

Vue.component('date', {
    props: ['value'],
    template: '#date-template',
    methods: {
        formatDate: function (value) {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 'timeZone': 'UTC' };
            return new Date(value).toLocaleDateString('en-US', options);
        }
    }
});

new Vue({
  el: '#timeline-app',
});
