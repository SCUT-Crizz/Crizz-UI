<template>
  <div>
    <cr-button type="primary" loading>Loading</cr-button>
    <cr-button type="primary" loading-icon="circle-notch" loading
      >Loading</cr-button
    >
    <cr-button type="primary" loading>
      <template #loading>
        <cr-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </cr-button>
  </div>
</template>
