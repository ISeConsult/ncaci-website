# TODO List for Integrating Response Data into Directorate Template

## Completed Tasks
- [x] Import `onMounted` from 'vue' in pages/directorate.vue
- [x] Fix computed property `filteredDiretorates` to use `documents.value` instead of `diretorates.value`
- [x] Update computed property to filter by `dir.file_type` instead of `dir.type`
- [x] Update template to display `dir.name` instead of `dir.title`
- [x] Update template to display `dir.file_type.toUpperCase()` instead of `dir.type.toUpperCase()`
- [x] Add `@click="downloadFile(dir.file)"` to the download div
- [x] Add `downloadFile` function to open file URL in new tab

## Summary
The template has been successfully integrated with the response data. The page now correctly displays documents from the store, allows filtering by file type, and enables downloading by clicking the download button.
