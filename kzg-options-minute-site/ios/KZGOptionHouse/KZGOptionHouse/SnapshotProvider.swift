import Foundation
import SwiftUI

enum OptionSnapshotProvider {
  static let latest = OptionSnapshot(
    tradeDate: "2026-05-22",
    range: "2024-05-17 至 2026-05-22",
    totalRows: "3,533,007",
    totalVolume: "7,325.2万",
    volumeChange: "+13.5%",
    premium: "$35.2B",
    premiumChange: "-6.8%",
    callPut: "1.56",
    headline: "个股主导，开盘成交集中，尾盘 15:00 出现明显压力桶。",
    timeline: [
      .init(label: "24/05", heat: 0.42),
      .init(label: "24/09", heat: 0.51),
      .init(label: "25/01", heat: 0.56),
      .init(label: "25/05", heat: 0.62),
      .init(label: "25/09", heat: 0.60),
      .init(label: "26/01", heat: 0.66),
      .init(label: "26/05", heat: 0.78)
    ],
    sectors: [
      .init(title: "指数", value: "30.3%", detail: "CP 0.95 · $12.7B", color: Color(red: 0.20, green: 0.37, blue: 0.56)),
      .init(title: "ETF", value: "8.9%", detail: "CP 1.35 · $1.5B", color: Color(red: 0.55, green: 0.44, blue: 0.22)),
      .init(title: "个股", value: "60.8%", detail: "CP 2.09 · $21.1B", color: Color(red: 0.67, green: 0.24, blue: 0.18))
    ],
    symbols: [
      .init(symbol: "SPY", volume: "1,018.5万", premium: "$2.1B", cp: "1.04", tone: .neutral),
      .init(symbol: "NVDA", volume: "428.3万", premium: "$1.4B", cp: "2.12", tone: .hot),
      .init(symbol: "TSLA", volume: "404.7万", premium: "$1.9B", cp: "2.01", tone: .hot),
      .init(symbol: "TLT", volume: "108.5万", premium: "$97.4M", cp: "5.15", tone: .warm),
      .init(symbol: "SMH", volume: "72.6万", premium: "$303.4M", cp: "0.11", tone: .cool),
      .init(symbol: "SMCI", volume: "49.9万", premium: "$84.3M", cp: "6.80", tone: .hot)
    ],
    buckets: [
      .init(time: "09:30", volume: 1147.8, cp: 1.83, drift: 0.11),
      .init(time: "10:00", volume: 825.7, cp: 1.78, drift: 0.09),
      .init(time: "10:30", volume: 620.0, cp: 1.92, drift: -0.03),
      .init(time: "11:00", volume: 577.6, cp: 1.63, drift: 0.08),
      .init(time: "11:30", volume: 468.5, cp: 1.53, drift: -0.00),
      .init(time: "12:00", volume: 446.4, cp: 1.46, drift: 0.05),
      .init(time: "12:30", volume: 363.0, cp: 1.56, drift: -0.04),
      .init(time: "13:00", volume: 446.7, cp: 1.45, drift: 0.14),
      .init(time: "13:30", volume: 437.1, cp: 1.63, drift: 0.20),
      .init(time: "14:00", volume: 383.5, cp: 1.41, drift: 0.03),
      .init(time: "14:30", volume: 369.1, cp: 1.50, drift: -0.01),
      .init(time: "15:00", volume: 539.1, cp: 1.17, drift: 0.30),
      .init(time: "15:30", volume: 636.0, cp: 1.35, drift: 0.16)
    ],
    rotations: [
      .init(symbol: "RGTI", volumeChange: 4.18, premiumChange: 6.72),
      .init(symbol: "QBTS", volumeChange: 3.09, premiumChange: 4.44),
      .init(symbol: "F", volumeChange: 2.60, premiumChange: 2.36),
      .init(symbol: "SMH", volumeChange: 1.90, premiumChange: -0.00),
      .init(symbol: "ASTS", volumeChange: 1.56, premiumChange: 2.72),
      .init(symbol: "SPY", volumeChange: -0.01, premiumChange: 0.07),
      .init(symbol: "INTC", volumeChange: -0.29, premiumChange: -0.44),
      .init(symbol: "SLV", volumeChange: -0.28, premiumChange: -0.46)
    ]
  )
}
