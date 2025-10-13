<template>
  <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <div class="py-12">
      <h1 class="text-xl font-bold text-center lg:text-left uppercase text1 mb-4 text-wrap lg:text-nowrap">
        {{ $t('nibalt.admission.title') }}
      </h1>
    </div>

    <ul class="list-disc pl-6 space-y-8">
      <li>
        <span class="font-bold text-base">{{ $t('nibalt.admission.applicationFormTitle') }}</span>
        <p class="text-base font-light text-left capitalize leading-relaxed mt-2">
          {{ $t('nibalt.admission.applicationFormDesc') }}
        </p>
      </li>

      <li>
        <span class="font-bold text-base">{{ $t('nibalt.admission.transcriptTitle') }}</span>
        <p class="text-base font-light text-left capitalize leading-relaxed mt-2">
          {{ $t('nibalt.admission.transcriptDesc') }}
        </p>
      </li>

      <li>
        <span class="font-bold text-base">{{ $t('nibalt.admission.collegeTranscriptsTitle') }}</span>
        <p class="text-base font-light text-left capitalize leading-relaxed mt-2">
          {{ $t('nibalt.admission.collegeTranscriptsDesc') }}
        </p>
      </li>

      <li>
        <span class="font-bold text-base">{{ $t('nibalt.admission.referenceLetterTitle') }}</span>
        <p class="text-base font-light text-left capitalize leading-relaxed mt-2">
          {{ $t('nibalt.admission.referenceLetterDesc') }}
        </p>
      </li>
    </ul>

    <div class="mt-8 flex flex-col items-start justify-start">
      <p class="text-base font-light text-left capitalize leading-relaxed">
        {{ $t('nibalt.admission.admissionNote') }}
      </p>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>