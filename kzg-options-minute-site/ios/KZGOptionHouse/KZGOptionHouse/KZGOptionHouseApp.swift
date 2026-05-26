import SwiftUI

@main
struct KZGOptionHouseApp: App {
  var body: some Scene {
    WindowGroup {
      DashboardView(snapshot: OptionSnapshotProvider.latest)
    }
  }
}
