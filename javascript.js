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
        getDynamicStyles: function() {
            return `
                <style>
                    .timeline {
                        background-color: ${this.timeline.secondaryColor};
                        color: ${this.timeline.color};
                    }
                    .details {
                        background-color: ${this.timeline.primaryColor};
                        color: ${this.timeline.color};
                    }
                    .line {
                        background-color: ${this.timeline.lineColor};
                    }
                    .event {
                        background-color: ${this.timeline.primaryColor};
                    }
                    .link {
                        color: ${this.timeline.color};
                    }
                    .event:nth-child(odd)::before {
                        border-right: 1rem solid ${this.timeline.primaryColor};
                    }
                    .event:nth-child(even)::before {
                        border-left: 1rem solid ${this.timeline.primaryColor};
                    }
                    @media screen and (max-width: 50rem) {
                        .event:nth-child(even)::before {
                            border-right: 1rem solid ${this.timeline.primaryColor};
                        }
                    }
                </style>
            `;
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
