<template>
  <div
    class="w-full max-w-7xl flex flex-col justify-start items-center rounded-lg bg-white dark:bg-grey-dark-100 border dark:border-white/10"
  >
    <div
      v-if="options?.searchbar"
      class="w-full flex justify-between items-center py-3 sm:px-4 px-3 gap-x-2"
    >
      <div class="relative">
        <transition name="fade">
          <app-button
            variant="outline"
            text="Bulk actions"
            class="hidden sm:flex justify-self-start"
            v-if="selectedKeys.length > 0"
            @click="isBulkDropdownOpen = true"
          >
            <template #icon>
              <BulkActionsIcon class="w-5 h-5" />
            </template>
          </app-button>
        </transition>
        <transition name="fade">
          <div
            v-if="selectedKeys.length > 0"
            class="px-2 py-2 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 block sm:hidden duration-200"
            @click="isBulkDropdownOpen = true"
          >
            <BulkActionsIcon class="w-5 h-5" />
          </div>
        </transition>
        <transition name="fade">
          <div
            class="border dark:border-white/10 shadow-lg p-1 rounded-lg absolute left-0 top-11 bg-white dark:bg-grey-dark-100 w-fit z-10"
            v-if="isBulkDropdownOpen"
            v-click-outside="() => (isBulkDropdownOpen = false)"
          >
            <div
              @click="deleteSelected"
              class="bg-transparent duration-100 text-red-600 dark:text-red-400 hover:bg-red-600/10 dark:hover:bg-red-400/10 rounded-lg flex flex-row justify-start gap-x-1 items-center whitespace-nowrap p-2 cursor-pointer w-52"
            >
              <DeleteIcon class="w-5 h-5" />
              <span class="text-sm">Delete selected</span>
            </div>
          </div>
        </transition>
      </div>
      <div class="relative flex flex-row justify-end gap-x-2">
        <SearchInput :name="`${name}-searchbar`" />
        <div
          class="relative flex flex-row items-center hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg cursor-pointer duration-200"
        >
          <FilterIcon class="w-9 px-2 h-5" />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="selectedKeys.length > 0"
        class="w-full h-auto flex flex-col justify-between gap-y-1 bg-gray-50 px-3 py-2 dark:bg-white/5 sm:flex-row sm:items-center sm:px-6 sm:py-1.5 border-t border-gray-200 dark:border-white/10"
      >
        <span class="text-sm font-medium leading-6 text-gray-700 dark:text-gray-200"
          >{{ selectedKeys.length }}
          {{ selectedKeys.length % 10 === 1 ? 'record' : 'records' }} selected
        </span>
        <div class="flex gap-x-3">
          <span
            @click="selectAll"
            class="relative inline-flex items-center justify-center font-semibold outline-none transition duration-75 hover:underline focus:underline gap-1.5 text-sm text-primary-300 dark:text-primary-dark-300 cursor-pointer"
            >Select all {{ data.length }}</span
          >
          <span
            @click="deselectAll"
            class="relative inline-flex items-center justify-center font-semibold outline-none transition duration-75 hover:underline focus:underline text-sm text-red-600 dark:text-red-400 cursor-pointer"
            >Deselect all</span
          >
        </div>
      </div>
    </transition>
    <div class="w-full max-w-7xl overflow-x-auto">
      <table
        class="border-y dark:border-white/10 table-auto scrollbar-thin scrollbar-track-grey-bg dark:scrollbar-track-grey-dark-50 scrollbar-thumb-grey-200 dark:scrollbar-thumb-gray-800"
      >
        <thead class="border-b dark:border-white/10 bg-gray-50 dark:bg-white/5">
          <tr>
            <th
              v-if="options.selectable"
              class="pl-4 py-3.5 text-sm font-semibold"
              :class="{
                'text-start': options.itemsAlignment === 'start' || !options?.itemsAlignment,
                'text-end': options.itemsAlignment === 'end',
                'text-center': options.itemsAlignment === 'center',
              }"
            >
              <AppCheckbox
                value="all"
                :name="`${name}_checkbox_all`"
                :defaultChecked="selectedKeys?.length === data?.length"
                @onCheck="onSelect"
              />
            </th>
            <th
              v-for="item in activeColumns"
              :key="item.key"
              class="py-3.5 last-of-type:pr-4 first-of-type:pl-4 px-4 whitespace-nowrap w-1"
              :class="{
                'text-start': options.itemsAlignment === 'start' || !options?.itemsAlignment,
                'text-end': options.itemsAlignment === 'end',
                'text-center': options.itemsAlignment === 'center',
              }"
            >
              <span class="text-sm font-semibold">{{ item.title }}</span>
              <button
                v-if="item.sortable"
                @click="sortCol(item.key, item.sortorder)"
                class="w-5 h-5 ml-2"
              >
                <ArrowIcon
                  class="w-2.5 h-2.5 transition-transform duration-200"
                  :class="{
                    'rotate-180': item.sortorder === 'asc',
                  }"
                />
              </button>
            </th>
            <th v-if="options.actions"></th>
          </tr>
        </thead>
        <transition-group
          name="flip-rows"
          tag="tbody"
          :class="{
            'text-start': options.itemsAlignment === 'start' || !options?.itemsAlignment,
            'text-end': options.itemsAlignment === 'end',
            'text-center': options.itemsAlignment === 'center',
          }"
        >
          <tr
            v-for="item in data"
            :key="item[dataPrimaryKey]"
            class="relative hover:bg-gray-50 text-sm font-normal border-b dark:border-white/10 dark:hover:bg-white/5 duration-100 cursor-pointer"
            :class="
              selectedKeys.includes(item[dataPrimaryKey])
                ? 'bg-gray-50 dark:bg-white/5'
                : 'bg-white dark:bg-grey-dark-100'
            "
          >
            <td
              v-if="options.selectable"
              class="py-3.5 px-4 w-1"
              :class="{
                'shadow-[inset_2px_0_0] shadow-primary-300 dark:shadow-primary-dark-300':
                  selectedKeys.includes(item[dataPrimaryKey]),
              }"
            >
              <AppCheckbox
                :value="item[dataPrimaryKey]"
                :name="`${name}_checkbox_${item[dataPrimaryKey]}`"
                @onCheck="onSelect"
                :defaultChecked="selectedKeys.includes(item[dataPrimaryKey])"
              />
            </td>
            <td
              v-for="col in activeColumns"
              :key="col.key"
              class="py-3.5 last-of-type:pr-4 first-of-type:pl-4 px-4 whitespace-nowrap"
              :class="options.mainCol === col.key ? 'w-full' : 'w-1'"
            >
              <slot :name="col.key" :item="item"></slot>
            </td>
            <td
              v-if="options.actions && options.actions?.length"
              class="pr-4 text-right whitespace-nowrap"
              :class="{
                'w-60': options?.actions?.length === 3,
                'w-40': options?.actions?.length === 2,
                'w-20': options?.actions?.length === 1,
              }"
            >
              <button
                v-for="action in options.actions"
                :key="action"
                @click="onAction(action, item[dataPrimaryKey])"
                class="table_btn ml-4 font-semibold"
              >
                <div
                  v-if="action === 'view'"
                  class="flex flex-row justify-start items-center gap-x-1"
                >
                  <ViewIcon class="w-4 h-4" />
                  <span class="table_btn__text text-gray-700 dark:text-gray-200">View</span>
                </div>
                <div
                  v-if="action === 'edit'"
                  class="flex flex-row justify-start items-center gap-x-1"
                >
                  <EditIcon class="w-4 h-4" />
                  <span class="table_btn__text text-primary-300 dark:text-primary-dark-300"
                    >Edit</span
                  >
                </div>
                <div
                  v-if="action === 'delete'"
                  class="flex flex-row justify-start items-center gap-x-1"
                >
                  <DeleteIcon class="w-4 h-4" />
                  <span class="table_btn__text text-red-600 dark:text-red-400">Delete</span>
                </div>
              </button>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
    <div class="w-full py-3 px-4 flex justify-between items-center gap-2 md:gap-0">
      <template v-if="options.paginated">
        <span class="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200 w-full">
          Showing 1 to {{ perpage }} of {{ data.length }} results
        </span>
        <div class="block md:hidden w-full">
          <app-button variant="outline" text="Previous" />
        </div>
        <div class="w-full flex justify-center items-center">
          <div
            class="flex flex-row justify-start border rounded-lg dark:border-grey-300 dark:bg-white/5 h-9 md:h-auto w-fit"
          >
            <div class="px-3 py-1.5 border-r dark:border-r-grey-300 hidden md:inline">
              <span class="text-sm dark:text-grey-200 text-grey-300">Per page</span>
            </div>
            <div class="p-0 rounded-r-lg relative">
              <select
                :name="`${name}_table_perpage_select`"
                class="h-full rounded-r-lg bg-transparent text-sm pl-3 pr-7 appearance-none"
                v-model="perpage"
              >
                <option v-for="option in perPageOptions" :value="option" :key="option">
                  <span class="text-gray-950">{{ option }}</span>
                </option>
              </select>
              <ArrowIcon
                class="w-2.5 h-2.5 rotate-180 absolute right-3 top-3.5 pointer-events-none"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end md:hidden w-full">
          <app-button variant="outline" text="Next" />
        </div>
        <div class="w-full hidden md:flex justify-end items-center">
          <div
            class="flex flex-row justify-start items-center border rounded-lg dark:border-grey-300 dark:bg-white/5 w-fit"
          >
            <div
              class="py-3 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 border-r dark:border-grey-300 duration-100"
            >
              <ArrowIcon class="w-3 h-3 -rotate-90" />
            </div>
            <div
              v-for="page in [1, 2, 3, 4, 5]"
              :key="page"
              class="py-1.5 px-3 border-x dark:border-grey-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 duration-100"
              :class="{
                'bg-gray-50 dark:bg-white/5 ': page === 3,
              }"
            >
              <span
                class="text-sm font-semibold"
                :class="{ 'text-primary-300 dark:text-primary-dark-300': page === 3 }"
                >{{ page }}</span
              >
            </div>
            <div
              class="py-3 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 border-l dark:border-grey-300 duration-100"
            >
              <ArrowIcon class="w-3 h-3 rotate-90" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SearchInput from '@/components/atoms/inputs/SearchInput.vue';
import AppCheckbox from '@/components/atoms/inputs/AppCheckbox.vue';
import ViewIcon from '@/components/icons/table/ViewIcon.vue';
import EditIcon from '@/components/icons/table/EditIcon.vue';
import DeleteIcon from '@/components/icons/table/DeleteIcon.vue';
import BulkActionsIcon from '@/components/icons/table/BulkActionsIcon.vue';
import FilterIcon from '@/components/icons/table/FilterIcon.vue';

/* Column example:
    key: 'colKey', // column key must equal key in data entry
    title: 'colTitle',
    sortable: true,
    sortorder: 'desc', <asc, desc>
    editable: true,
    hidden: true, // undefined or false to activate columns
  Options example:
    options: {
      mainCol: <column key, which will take full width>,
      searchbar: true,
      selectable: true,
      paginated: true,
      pagination: {
        totalPages: 5,
        currentPage: 3,
        perPage: 10,
      }
      itemsAlignment: 'start', <center, end>
      actions: ['view', 'edit', 'delete'],
    },
*/
export default {
  name: 'AppTable',
  props: ['name', 'columns', 'data', 'dataPrimaryKey', 'filters', 'options'],
  components: {
    ArrowIcon,
    SearchInput,
    AppCheckbox,
    ViewIcon,
    EditIcon,
    DeleteIcon,
    BulkActionsIcon,
    FilterIcon,
  },
  computed: {
    activeColumns() {
      return this.columns.filter((item) => !item.hidden);
    },
  },
  data() {
    return {
      selectedKeys: [],
      perPageOptions: [5, 10, 25, 50],
      perpage: 5,
      isBulkDropdownOpen: false,
    };
  },
  methods: {
    onAction(action, id) {
      switch (action) {
        case 'view':
          this.$emit('on-view', id);
          break;
        case 'edit':
          this.$emit('on-edit', id);
          break;
        case 'delete':
          this.$emit('on-delete', id);
          break;
        default:
          return;
      }
    },
    sortCol(key, order) {
      const orderToEmit = order === 'asc' ? 'desc' : 'asc';
      this.$emit('on-sort', key, orderToEmit);
    },
    onSelect(value, isSelected) {
      if (value === 'all') {
        this.selectedKeys = [];
        if (isSelected) {
          const keys = this.data.map((item) => {
            return item[this.dataPrimaryKey];
          });
          this.selectedKeys = [...keys];
        }
        return;
      }
      if (isSelected) {
        this.selectedKeys.push(value);
      } else {
        const index = this.selectedKeys.findIndex((item) => item === value);
        index !== -1 && this.selectedKeys.splice(index, 1);
      }
      return;
    },
    selectAll() {
      const keys = this.data.map((item) => {
        return item[this.dataPrimaryKey];
      });
      this.selectedKeys = [...keys];
    },
    deselectAll() {
      this.selectedKeys = [];
    },
    deleteSelected() {
      this.$emit('on-bulk', this.selectedKeys, 'delete');
      this.isBulkDropdownOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.table_wrapper {
  min-width: 1024px;
  overflow-x: scroll;
}
.table_btn:hover .table_btn__text {
  text-decoration: underline;
}
.flip-rows-move {
  transition: transform 0.2s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
