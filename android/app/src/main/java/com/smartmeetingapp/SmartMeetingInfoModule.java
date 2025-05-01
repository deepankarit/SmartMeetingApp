package com.smartmeetingapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;
@ReactModule(name = SmartMeetingInfoModule.NAME)
public class SmartMeetingInfoModule extends ReactContextBaseJavaModule implements TurboModule {
    public static final String NAME = "SmartMeetingInfo";
    SmartMeetingInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getAppVersion() {
        return "1.0.0";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getEnvironment() {
        return "Production";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getAppName() {
        return "SmartMeeting AI";
    }
}