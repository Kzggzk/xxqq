import Foundation
import SwiftUI

struct OptionSnapshot {
  var tradeDate: String
  var range: String
  var totalRows: String
  var totalVolume: String
  var volumeChange: String
  var premium: String
  var premiumChange: String
  var callPut: String
  var headline: String
  var timeline: [TimelinePoint]
  var sectors: [SectorMetric]
  var symbols: [SymbolPulse]
  var buckets: [IntradayBucket]
  var rotations: [RotationPoint]
  var flowFilters: [FlowFilter]
  var flowLanes: [FlowLane]
  var historyPillars: [HistoryPillar]
}

struct TimelinePoint: Identifiable {
  var id = UUID()
  var label: String
  var heat: Double
}

struct SectorMetric: Identifiable {
  var id = UUID()
  var title: String
  var value: String
  var detail: String
  var color: Color
}

struct SymbolPulse: Identifiable {
  var id = UUID()
  var symbol: String
  var volume: String
  var premium: String
  var cp: String
  var tone: PulseTone
}

struct IntradayBucket: Identifiable {
  var id = UUID()
  var time: String
  var volume: Double
  var cp: Double
  var drift: Double
}

struct RotationPoint: Identifiable {
  var id = UUID()
  var symbol: String
  var volumeChange: Double
  var premiumChange: Double
}

struct FlowFilter: Identifiable {
  var id = UUID()
  var label: String
  var value: String
  var detail: String
}

struct FlowLane: Identifiable {
  var id = UUID()
  var title: String
  var subtitle: String
  var tone: PulseTone
  var items: [FlowItem]
}

struct FlowItem: Identifiable {
  var id = UUID()
  var time: String
  var symbol: String
  var count: String
  var strategy: String
  var premium: String
  var delta: String
}

struct HistoryPillar: Identifiable {
  var id = UUID()
  var title: String
  var value: String
  var detail: String
}

enum PulseTone {
  case hot
  case warm
  case cool
  case neutral

  var color: Color {
    switch self {
    case .hot: Color(red: 0.72, green: 0.20, blue: 0.14)
    case .warm: Color(red: 0.69, green: 0.43, blue: 0.08)
    case .cool: Color(red: 0.20, green: 0.40, blue: 0.58)
    case .neutral: Color(red: 0.34, green: 0.36, blue: 0.32)
    }
  }
}
