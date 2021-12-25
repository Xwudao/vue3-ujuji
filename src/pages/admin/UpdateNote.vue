<script lang="ts" setup="setup">
  import BoxCard from '@/components/common/BoxCard.vue';
  import { computed, reactive, ref, watch } from 'vue';
  import { activities } from '@/assets/data/updateNotes.json';
  const form = reactive({
    page: 1,
    size: 5,
    offset: 0,
  });
  const len = computed(() => {
    return activities.length || 0;
  });
  const note = computed(() => {
    const offset = form.size * form.page - form.size;
    return activities.slice(offset, offset + form.size);
  });
  const handleChange = (p: number) => {
    form.page = p;
  };
</script>

<template>
  <box-card>
    <template #title>更新日志</template>
    <div>
      <el-timeline>
        <el-timeline-item
          v-for="(item, i) in note"
          :key="i"
          :color="item.color"
          :timestamp="item.timestamp"
          placement="top"
        >
          <el-card>
            <p>
              {{ item.content }}
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="flex justify-center mt-4">
      <el-pagination
        :total="len"
        background
        :page-size="form.size"
        :current-page="form.page"
        @current-change="handleChange"
      />
    </div>
  </box-card>
</template>

<style lang="scss" scoped></style>
