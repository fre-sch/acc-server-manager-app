<script>
  import isNil from "lodash/isNil"
  import dayjs from "dayjs"
  import relativeTime from 'dayjs/plugin/relativeTime'
  dayjs.extend(relativeTime)

  export let value

  $: day_value = isNil(value) ? "" : dayjs(value).fromNow()
</script>

<span class="date-relative" title={value}>{ day_value }</span>
