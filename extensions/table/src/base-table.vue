<script lang="ts">
import { defineComponent, computed } from 'vue';
import { TableOptions, createDefaultTableOptions } from './base-table.ts';
import { useWidget } from '../../../packages/core/src/widget.ts';

export default defineComponent({
  name: 'BaseTable',
  props: {
    options: {
      type: Object as () => TableOptions,
      required: true,
      default: createDefaultTableOptions,
    },
  },
  setup(props) {
    const tableOptions = computed(() => props.options);

    return {
      tableOptions,
    };
  },
});
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="column in tableOptions.columns" :key="column.field">
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableOptions.data" :key="row.id">
          <td v-for="column in tableOptions.columns" :key="`${row.id}-${column.field}`">
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f9f9f9;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2; 
}
</style>
