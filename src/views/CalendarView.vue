<template>
  <v-row class="fill-height">
    <v-col>
      <!-- filter date mounth etc.. -->
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet>
        <v-calendar interval-width="60" first-interval=8 interval-count=14 ref="calendar" v-model="value"
          color="primary" :type="type" :events=" $store.state.events" :event-color="getEventColor" :event-ripple="false"
          @click:event="onEventClicked" @click:time="onClickTime" @change="getEvents" >
         
        </v-calendar>



        <!-- menu event -->

        <ShFormEventDialog
          :dialog="formEventDialog"
          @closeEventDialog="onCloseEventDialog"
          :preEvent = "createEvent"
        >

        </ShFormEventDialog>

        <!-- <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="colors[0]" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html=""></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html=""></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu> -->


        <!-- end menu event -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

import { toTimestamp  } from "@/utils";
import ShFormEventDialog from "@/components/ShFormEventDialog.vue";
export default {
    data: () => ({
        formEventDialog:false,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
      //  hour: 60 * 60 * 1000,
        focus: "",
        type: "4day",
        typeToLabel: {
            month: "Month",
            week: "Week",
            day: "Day",
            "4day": "4 Days",
        },
        value: "",
      
        colors: ["#2196F3", "#3F51B5", "#673AB7", "#00BCD4", "#4CAF50", "#FF9800", "#757575"],
        names: ["Meeting", "Holiday", "PTO", "Travel", "Event", "Birthday", "Conference", "Party"],
        createEvent: null,
        createStart: null,
    }),
    methods: {
        onCloseEventDialog(){
            this.formEventDialog = false
        },
        onClickTime(e) {
            this.formEventDialog = true
           
            var startDate = toTimestamp(
              e.year,
              e.month,
              e.day,
              e.hour - 2
            );
            var checkingExisitEventsOnTheSameHour = this.$store.state.events.filter(item => {
              return item.start === startDate
            })
            if (checkingExisitEventsOnTheSameHour.length === 0) {
              this.createEvent = {
                name: ``,
                color: this.rndElement(this.colors),
                start: startDate,
                end: 0,
                timed: true,
              }
              
             // this.$store.state.events.push(this.createEvent)
              e.preventDefault
            }
        },
        onEventClicked({ nativeEvent, event }) {
          // we got the event created
          console.log(event);
            const open = () => {
                this.selectedEvent = event;
                this.selectedElement = nativeEvent.target;
                this.selectedOpen = true
            };
            if (this.selectedOpen) {
                this.selectedOpen = false;
                 open()
            }
            else {
                open();
            }
            nativeEvent.stopPropagation();
        },
        viewDay({ date }) {
            this.focus = date;
            this.type = "day";
        },
        getEventColor(event) {
            return event.color;
        },
        setToday() {
            this.focus = Date.now();
            this.type = "day";
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        getEvents({ start, end }) {
            // const events = []
            // const min = new Date(`${start.date}T00:00:00`).getTime()
            // const max = new Date(`${end.date}T23:59:59`).getTime()
            // const days = (max - min) / 86400000
            // const eventCount = this.rnd(days, days + 20)
            // for (let i = 0; i < eventCount; i++) {
            //   const timed = this.rnd(0, 3) !== 0
            //   const firstTimestamp = this.rnd(min, max)
            //   const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
            //   const start = firstTimestamp - (firstTimestamp % 900000)
            //   const end = start + secondTimestamp
            //   events.push({
            //     name: this.rndElement(this.names),
            //     color: this.rndElement(this.colors),
            //     start,
            //     end,
            //     timed,
            //   })
            // }
            // this.events = events
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        },
        rndElement(arr) {
            return arr[this.rnd(0, arr.length - 1)];
        },
    },
    components: { ShFormEventDialog }
}
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>