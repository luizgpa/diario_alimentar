<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MealEntry } from '@/types/MealEntry'
import { generateMealPdf, sharePdf } from '@/utils/generateMealPdf'

const { t } = useI18n()

const form = reactive<MealEntry>({
  day: '',
  mealName: '',
  time: '',
  whatConsumed: '',
  whereWas: '',
  withWho: '',
  feelingBefore: '',
  satietyLevelBefore: 5,
  feelingDuring: '',
  feelingAfter: '',
  satietyLevelAfter: 5,
  notes: '',
})

async function handleSubmit() {
  const pdf = generateMealPdf({ ...form })
  await sharePdf(pdf, form)
  Object.assign(form, {
    day: '',
    mealName: '',
    time: '',
    whatConsumed: '',
    whereWas: '',
    withWho: '',
    feelingBefore: '',
    satietyLevelBefore: 5,
    feelingDuring: '',
    feelingAfter: '',
    satietyLevelAfter: 5,
    notes: '',
  })
}
</script>

<template>
  <form class="meal-form" @submit.prevent="handleSubmit">
    <h2>{{ t('form.title') }}</h2>

    <div class="form-group">
      <label for="day">{{ t('form.fields.day') }}</label>
      <input id="day" v-model="form.day" type="date" required />
    </div>

    <div class="form-group">
      <label for="mealName">{{ t('form.fields.mealName') }}</label>
      <input id="mealName" v-model="form.mealName" type="text" required />
    </div>

    <div class="form-group">
      <label for="time">{{ t('form.fields.time') }}</label>
      <input id="time" v-model="form.time" type="time" lang="pt-BR" required />
    </div>

    <div class="form-group">
      <label for="whatConsumed">{{ t('form.fields.whatConsumed') }}</label>
      <textarea id="whatConsumed" v-model="form.whatConsumed" rows="2" required></textarea>
    </div>

    <div class="form-group">
      <label for="whereWas">{{ t('form.fields.whereWas') }}</label>
      <input id="whereWas" v-model="form.whereWas" type="text" />
    </div>

    <div class="form-group">
      <label for="withWho">{{ t('form.fields.withWho') }}</label>
      <input id="withWho" v-model="form.withWho" type="text" />
    </div>

    <div class="form-group">
      <label for="feelingBefore"
        >{{ t('form.fields.feelingBefore') }} ({{ t('form.fields.feelingBeforeHint') }})</label
      >
      <textarea id="feelingBefore" v-model="form.feelingBefore" rows="2"></textarea>
    </div>

    <div class="form-group">
      <label for="satietyLevelBefore"
        >{{ t('form.fields.satietyLevelBefore') }} {{ t('form.fields.satietyLevelRange') }}</label
      >
      <div class="range-container">
        <input
          id="satietyLevelBefore"
          v-model.number="form.satietyLevelBefore"
          type="range"
          min="0"
          max="10"
        />
        <span class="range-value">{{ form.satietyLevelBefore }}</span>
      </div>
    </div>

    <div class="form-group">
      <label for="feelingDuring">{{ t('form.fields.feelingDuring') }}</label>
      <textarea id="feelingDuring" v-model="form.feelingDuring" rows="2"></textarea>
    </div>

    <div class="form-group">
      <label for="feelingAfter">{{ t('form.fields.feelingAfter') }}</label>
      <textarea id="feelingAfter" v-model="form.feelingAfter" rows="2"></textarea>
    </div>

    <div class="form-group">
      <label for="satietyLevelAfter"
        >{{ t('form.fields.satietyLevelAfter') }} {{ t('form.fields.satietyLevelRange') }}</label
      >
      <div class="range-container">
        <input
          id="satietyLevelAfter"
          v-model.number="form.satietyLevelAfter"
          type="range"
          min="0"
          max="10"
        />
        <span class="range-value">{{ form.satietyLevelAfter }}</span>
      </div>
    </div>

    <div class="form-group">
      <label for="notes">{{ t('form.fields.notes') }}</label>
      <textarea id="notes" v-model="form.notes" rows="3"></textarea>
    </div>

    <button type="submit">{{ t('form.submit') }}</button>

    <p class="github-link">
      <a href="https://github.com/luizgpa/diario_alimentar" target="_blank" rel="noopener">{{
        t('form.githubLink')
      }}</a>
    </p>
  </form>
</template>

<style scoped>
.meal-form {
  box-sizing: border-box;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

input[type='text'],
input[type='date'],
input[type='time'],
textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

.range-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

input[type='range'] {
  flex: 1;
  accent-color: #4caf50;
}

.range-value {
  min-width: 2rem;
  text-align: center;
  font-weight: 500;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}

.github-link {
  margin-top: 1.5rem;
  text-align: center;
}

.github-link a {
  color: #4caf50;
  text-decoration: none;
}

.github-link a:hover {
  text-decoration: underline;
}
</style>
