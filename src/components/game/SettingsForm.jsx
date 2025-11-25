import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSettingsStore from "../../stores/useSettingsStore";

const settingsSchema = yup
  .object({
    difficulty: yup
      .string()
      .oneOf(["easy", "medium", "hard"], "Оберіть правильну складність")
      .required("Складність обов'язкова"),
    gridSize: yup
      .number()
      .min(3, "Мінімум 3x3")
      .max(6, "Максимум 6x6")
      .required("Розмір поля обов'язковий"),
    timerEnabled: yup.boolean(),
    soundEnabled: yup.boolean(),
  })
  .required();

function SettingsForm({ onCancel }) {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: settings, 
    mode: "onChange",
  });

  const onSubmit = (data) => {
    updateSettings(data);
    setTimeout(() => {
      const current = useSettingsStore.getState().settings;
    }, 100);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
      <h2>Налаштування гри</h2>

      <div className="form-group">
        <label htmlFor="difficulty">Складність:</label>
        <select
          id="difficulty"
          {...register("difficulty")}
          className={errors.difficulty ? "error" : ""}
        >
          <option value="easy">Легко</option>
          <option value="medium">Середньо</option>
          <option value="hard">Важко</option>
        </select>
        {errors.difficulty && (
          <span className="error-message">{errors.difficulty.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gridSize">Розмір поля (3-6):</label>
        <input
          id="gridSize"
          type="number"
          {...register("gridSize", { valueAsNumber: true })}
          className={errors.gridSize ? "error" : ""}
          min="3"
          max="6"
        />
        {errors.gridSize && (
          <span className="error-message">{errors.gridSize.message}</span>
        )}
        <small className="form-hint">
          Поточне значення: {settings.gridSize}
        </small>
      </div>

      <div className="form-group checkbox">
        <label>
          <input type="checkbox" {...register("timerEnabled")} />
          <span>Увімкнути таймер</span>
        </label>
      </div>

      <div className="form-group checkbox">
        <label>
          <input type="checkbox" {...register("soundEnabled")} />
          <span>Увімкнути звук</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={!isValid}>
          Зберегти
        </button>
        {onCancel && (
          <button type="button" className="btn secondary" onClick={onCancel}>
            Скасувати
          </button>
        )}
      </div>
      <div className="settings-preview">
        <h4>Поточні налаштування:</h4>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </form>
  );
}

export default SettingsForm;
