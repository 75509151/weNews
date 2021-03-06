package com.wenews;

import com.facebook.react.ReactActivity;
import cn.reactnative.modules.jpush.JPushPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import android.content.Intent;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
   private ReactNativePushNotificationPackage mReactNativePushNotificationPackage; // <------ Add Package Variable
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "weNews";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this); // <------ Initialize the Package
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new JPushPackage(),
            mReactNativePushNotificationPackage

        );
    }

    // Add onNewIntent
   @Override
   protected void onNewIntent (Intent intent) {
     super.onNewIntent(intent);

     mReactNativePushNotificationPackage.newIntent(intent);
   }
}
