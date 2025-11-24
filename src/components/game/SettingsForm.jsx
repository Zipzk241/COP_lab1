import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

function SettingsForm({ currentSettings, onSave, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: currentSettings,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    onSave(data);
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
        <label htmlFor="gridSize">Розмір поля:</label>
        <input
          id="gridSize"
          type="number"
          {...register("gridSize")}
          className={errors.gridSize ? "error" : ""}
        />
        {errors.gridSize && (
          <span className="error-message">{errors.gridSize.message}</span>
        )}
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
        <button type="button" className="btn secondary" onClick={onCancel}>
          Скасувати
        </button>
      </div>
    </form>
  );
}

export default SettingsForm;
