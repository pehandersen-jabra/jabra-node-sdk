#include "logger.h"
#include <string>
#include <iostream>
#ifdef  __APPLE__
#include <unistd.h>
#endif
#include <plog/Log.h>
// Node lib headers:
#include <napi.h>
#include "napiutil.h"

using namespace std;

static bool endsWith(const std::string& str, const std::string& suffix)
{
	return str.size() >= suffix.size() && 0 == str.compare(str.size() - suffix.size(), suffix.size(), suffix);
}

#ifdef _WIN32
#pragma warning(disable : 4996)
#endif

static std::string configuredLogPath = "";

const std::string& getLogFilePath() {
  return configuredLogPath;
}

void configureLogging() {
  // Use same defaults and environment variable as Jabra SDK to setup
  // log destinaton.
  const char * const resPath = std::getenv("LIBJABRA_RESOURCE_PATH");
  string logPath(resPath ? resPath : "");

  if (logPath.empty()) {
	#ifdef _WIN32
		const char * const appDataPath = getenv("APPDATA");
		logPath = string(appDataPath ? appDataPath : "");
		logPath = logPath.append("\\JabraSDK");
	#elif  __APPLE__
    char * homePath = getenv("HOME");
    char buf[PATH_MAX];
    if(homePath == NULL) {
      //For some reason the home directory is not found. So try getting the current working dir and create the log file
      homePath = getcwd(buf,PATH_MAX);
    }
    logPath = string(homePath ? homePath : "");
		logPath = logPath.append("/Library/Application Support/JabraSDK");
	#elif  __linux__
		// Unlike SDK we don't support syslog for linux so
		// just use a subfolder under home dir.
		const char * const homePath = getenv("HOME");
		logPath = string(homePath ? homePath : "");
		logPath = logPath.append("/JabraSDK");
	#endif
  }

  if (!endsWith(logPath, "/") && !endsWith(logPath, "\\")) {
	#ifdef _WIN32
		logPath = logPath.append("\\");
	#else
		logPath = logPath.append("/");
	#endif
  }

  logPath = logPath.append("JabraNodeWrapper.log");

  // Use same environment variable and defaults as Jabra SDK to setup log level.
  const char * const _severityEnv = std::getenv("LIBJABRA_TRACE_LEVEL");
  std::string severityEnv(_severityEnv ? _severityEnv : "warning");

  plog::Severity severity = plog::warning;
  if (severityEnv == "fatal") {
    severity = plog::fatal;
  } else if (severityEnv == "error") {
    severity = plog::error;
  } else if (severityEnv == "warning") {
    severity = plog::warning;
  } else if (severityEnv == "info") {
    severity = plog::info;
  } else if (severityEnv == "debug") {
    severity = plog::debug;
  } else if (severityEnv == "trace" || severityEnv == "verbose") {
    severity = plog::verbose;
	} else {
    severity = plog::none;
  }

  // Setup plog:
	plog::init(severity, logPath.c_str(), 10000000, 10);

  // Save log location for reference (if anything is logged).
  configuredLogPath = (severity!=plog::none) ? logPath : "";

  // Log configuration:
  IF_LOG(plog::info) {
    LOG(plog::info) << "Configured logging severity to: " << plog::severityToString(severity);   
  }
}

void logSimpleString(const plog::Severity severity, const std::string str) {
    LOG(severity) << str;
}

/**
 * Expose a simple way to add to the log from node as well.
 */
Napi::Value napi_NativeAddonLog(const Napi::CallbackInfo& info) {
  const Napi::Env env = info.Env();

  if (util::verifyArguments(__func__, info, { util::NUMBER, util::STRING, util::OBJECT_OR_STRING })) {
    plog::Severity severity = (plog::Severity)(info[0].As<Napi::Number>().Int32Value());
    std::string caller = std::string("javascript:") + std::string(info[1].As<Napi::String>());
    std::string msg = info[2].As<Napi::Object>().ToString();

    // Use variant of LOG macro implementation to ensure caller instead of __func__ is registered in log:
    (*plog::get<PLOG_DEFAULT_INSTANCE>()) += plog::Record(severity, caller.c_str(), 0, nullptr, PLOG_GET_THIS()) << msg;
  }

  return env.Undefined();
}

/*
void log_exception(plog::Severity severity, const std::exception& e, const std::string& contextString, int level) {
    LOG(severity) << "Standard error " << contextString << " : " << e.what();
    try {
        std::rethrow_if_nested(e);
    } catch(const std::exception& e) {
        log_exception(severity, e, contextString, level+1);
    } catch(...) {
		    LOG(severity) << "Unknown error" << contextString;
		}
}*/
