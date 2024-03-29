
/**
 * This enum is used for the return values from API.
 */
export enum enumAPIReturnCode {
  Return_Ok = 0,
  Device_Unknown = 1,
  Device_Invalid = 2,
  Not_Supported = 3,
  Return_ParameterFail = 4,
  ProtectedSetting_Write = 5,
  No_Information = 6,
  NetworkRequest_Fail = 7,
  Device_WriteFail = 8,
  Device_ReadFails = 9,
  No_FactorySupported = 10,
  System_Error = 11,
  Device_BadState = 12,
  FileWrite_Fail = 13,
  File_AlreadyExists = 14,
  File_Not_Accessible = 15,
  Firmware_UpToDate = 16,
  Firmware_Available = 17,
  Return_Async = 18,
  Invalid_Authorization = 19,
  FWU_Application_Not_Available = 20,
  Device_AlreadyConnected = 21,
  Device_NotConnected = 22,
  CannotClear_DeviceConnected = 23,
  Device_Rebooted = 24,
  Upload_AlreadyInProgress = 25,
  Download_AlreadyInProgress = 26,
  FFI_Async_Error = 27, // ??
  Invalid_Param = 28, // ??
  Parse_Error = 29, // ??
}


/**
 * When jabra device is attached, various info(i.e downloading manifest file) about this device is fetched from cloud. Any error status during this process is represented by this Enum.
 */
export enum enumDeviceErrorStatus {
  NoError = 0,
  SSLError = 1,
  CertError = 2,
  NetworkError = 3,
  DownloadError = 4,
  ParseError = 5,
  OtherError = 6,
  DeviceInfoError = 7,
  FileNotAccessible = 8,
  FileNotCompatible = 9,
  Device_NotFound = 10,
  Parameter_fail = 11,
  Authorization_failed = 12,
  FileNotAvailable = 13,
  ConfigParseError = 14,
  SetSettings_Fail = 15,
  Device_Reboot = 16,
  Device_ReadFail = 17,
  Device_NotReady = 18,
  FilePartiallyCompatible = 19,
}

/**
 * This enum is used to represent Jabra device button.
 */
export enum enumDeviceBtnType {
  Undefined = 0,
  OffHook = 1,  
  Mute = 2, 
  Flash = 3,
  Redial = 4,
  Key0 = 5,
  Key1 = 6,
  Key2 = 7,
  Key3 = 8,
  Key4 = 9,
  Key5 = 10,
  Key6 = 11,
  Key7 = 12,
  Key8 = 13,
  Key9 = 14,
  KeyStar = 15,
  KeyPound = 16,
  KeyClear = 17,
  Online = 18,
  SpeedDial = 19,
  VoiceMail = 20,
  LineBusy = 21,
  RejectCall = 22,
  OutOfRange = 23,
  PseudoOffHook = 24,
  Button1 = 25,
  Button2 = 26,
  Button3 = 27,
  VolumeUp = 28,
  VolumeDown = 29,
  FireAlarm = 30,
  JackConnection = 31,
  QDConnection = 32,
  HeadsetConnection = 33,
}

/**
 * This enum is used to represent how device is connected to system via USB or Bluetooth.<br>
 * `USB` - device that connect through USB.<br>
 * `Bluetooth` - device that connect through dongle.
 */
export enum enumDeviceConnectionType {
  USB = 0,
  BT = 1
}

/**
 * Enum used for the current value of setting. Setting value is either number or string
 */
export enum enumSettingDataType {
  NUMBER = 0,
  STRING = 1
}

/**
 * Enum used for setting control type
 */
export enum enumSettingCtrlType {
  RADIO = 0,
  TOGGLE = 1,
  COMBOBOX = 2,
  DROPDOWN = 3,
  LABEL = 4,
  TEXTBOX = 5,
  BUTTON = 6,
  UNKNOWN = 7
}

/**
 * This enum represents the settings load mode for the API
 */
export enum enumSettingLoadMode  {
  expressMode = 0,
  retrieveMode = 1
}

/**
 * This enum represents the firmware update status
 */
export enum enumFirmwareEventStatus {
  Initiating = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
  File_NotAvailable = 4,
  File_NotAccessible = 5,
  File_AlreadyPresent = 6,
  Network_Error = 7,
  SSL_Error = 8,
  Download_Error = 9,
  Update_Error = 10,
  Invalid_Authentication = 11,
  File_UnderDownload = 12,
  Not_Allowed = 13,
}

/**
 * This enum represents the firmware type
 */
export enum enumFirmwareEventType {
  Firmware_Download = 0,
  Firmware_Update = 1
}

/**
 * This enum represents the bluetooth paired list type
 */
export enum enumBTPairedListType {
  SearchResult = 0,
  PairedDevices = 1,
  SearchComplete = 2
}

export enum enumUploadEventStatus {
  Upload_InProgress = 0,
  Upload_Completed = 1,
  Upload_Error = 2
}

export enum audioFileFormat {
  AUDIO_FILE_FORMAT_NOT_USED = 0,
  AUDIO_FILE_FORMAT_WAV_UNCOMPRESSED = 1,
  AUDIO_FILE_FORMAT_ULAW_COMPRESSED = 2,
  AUDIO_FILE_FORMAT_SBC_COMPRESSED = 3,
  AUDIO_FILE_FORMAT_G72_COMPRESSED = 4
}

/**
 * This enum represents the features are available to Device.
 */
export enum enumDeviceFeature {
  BusyLight = 1000,
  FactoryReset = 1001,
  PairingList = 1002,
  RemoteMMI = 1003,
  MusicEqualizer = 1004,
  EarbudInterconnectionStatus = 1005,
  StepRate = 1006,
  HeartRate = 1007,
  RRInterval = 1008,
  RingtoneUpload = 1009,
  ImageUpload = 1010,
  NeedsExplicitRebootAfterOta = 1011,
  NeedsToBePutIncCradleToCompleteFwu = 1012,
  RemoteMMIv2 = 1013,
  Logging = 1014,
  PreferredSoftphoneListInDevice = 1015,
  VoiceAssistant = 1016,
  PlayRingtone = 1017,
  SetDateTime = 1018,
  FullWizardMode = 1019,
  LimitedWizardMode = 1020,
  OnHeadDetection = 1021,
  SettingsChangeNotification = 1022,
  AudioStreaming = 1023,
}

/**
 * Enum for setting the HID working state.
 */
export enum enumHidState {
  NOT_SUPPORTED = 0,
  STD_HID = 1,
  GN_HID = 2
}

export enum enumWizardMode {
  FULL_WIZARD = 0,
  LIMITED_WIZARD = 1,
  NO_WIZARD = 2
}

export enum enumLogging {
  Local = 0,
  Cloud = 1,
  All = 2
}


