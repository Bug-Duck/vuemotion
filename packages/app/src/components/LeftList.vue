<script setup lang="ts">
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
</script>

<template>
  <div class="card">
    <Tabs value="0" :scrollable="true">
      <TabList>
        <Tab value="0">
          Scenes
        </Tab>
        <Tab value="1">
          Assets
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0" />
        <TabPanel value="1" />
      </TabPanels>
    </Tabs>
  </div>
</template>
