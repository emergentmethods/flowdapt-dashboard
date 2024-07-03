export const configExample = `# Default example
study_identifier: "full_uscities"
data_split_parameters:
  test_size: 0.05  # 256
  shuffle: false
model_train_params:
  # xgboost parameters
  n_jobs: 4
  n_estimators: 5 # 40
  # tree_method: "gpu_hist"
  alpha: 0.5
  min_child_weight: 5
  learning_rate: 0.1
  eval_metric: "rmse"
  max_depth: 6
  verbosity: 1
  # neural net parameters
  epochs: 2  # 35
  batch_size: 8  # 64
  lookback: 6
  hidden_dim: 2048
  shuffle: True
extra:
  weight_factor: 0.9
  di_threshold: 5.0
  num_points: 450  # 3500

data_config:
  origins: "openmeteo"
  frequencies: "hourly"
  extras:
    n_days: 20  # 150
    neighbors: 2  # 7 
    radius: 150
    prediction_points: 1
    target_horizon: 6  # hours
    city_data_path: "user_data/plugins/openmeteo/uscities.csv"
    models: ["XGBoostRegressor", "PyTorchTransformer"]  # "PyTorchLSTMDirect", "PyTorchMLPRegressor", "PyTorchLSTMAutoregressive"
    cities: ['Los Angeles'] # , 'Miami', 'Boston']
    horizon_cut: [False] # , True]
    reuse: [False] #, True]
    targets: ["temperature_2m"] # , "windspeed_10m", "cloudcover"]
    drift_pct: 0.05
`;
