import SwiftUI

struct DashboardView: View {
  let snapshot: OptionSnapshot
  @State private var selectedSymbol = "SPY"

  var selectedPulse: SymbolPulse {
    snapshot.symbols.first { $0.symbol == selectedSymbol } ?? snapshot.symbols[0]
  }

  var body: some View {
    NavigationStack {
      ScrollView {
        VStack(alignment: .leading, spacing: 8) {
          Header(snapshot: snapshot)
          CheckpointStrip()
          TimelineStrip(points: snapshot.timeline)
          SummaryGrid(snapshot: snapshot)
          ReadBus(snapshot: snapshot)
          SectorBand(sectors: snapshot.sectors)
          IntradayCard(buckets: snapshot.buckets)
          RotationCard(points: snapshot.rotations)
          SymbolFocusCard(symbols: snapshot.symbols, selectedSymbol: $selectedSymbol, selectedPulse: selectedPulse)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
      }
      .background(Color(red: 0.97, green: 0.96, blue: 0.93))
      .navigationBarTitleDisplayMode(.inline)
      .toolbar {
        ToolbarItem(placement: .principal) {
          Text("KZG OPTION HOUSE")
            .font(.system(.headline, design: .serif, weight: .bold))
        }
      }
    }
  }
}

private struct Header: View {
  let snapshot: OptionSnapshot

  var body: some View {
    VStack(alignment: .leading, spacing: 7) {
      HStack(alignment: .firstTextBaseline, spacing: 8) {
        VStack(alignment: .leading, spacing: 2) {
          Text("KZG OPTION HOUSE")
            .font(.system(size: 21, weight: .black, design: .serif))
          Text("MINUTE AGGREGATE OPTION REPORT")
            .font(.system(size: 10, weight: .bold, design: .rounded))
            .foregroundStyle(.secondary)
        }
        Spacer()
        VStack(alignment: .trailing, spacing: 2) {
          Text(snapshot.tradeDate)
            .font(.system(.subheadline, design: .rounded, weight: .bold))
          Text("iOS companion 0.4")
            .font(.caption2.weight(.semibold))
            .foregroundStyle(.secondary)
        }
      }
      Text(snapshot.headline)
        .font(.system(.subheadline, design: .serif))
        .foregroundStyle(.primary)
        .lineSpacing(2)
      Text(snapshot.range)
        .font(.caption2.weight(.semibold))
        .foregroundStyle(.secondary)
    }
    .padding(11)
    .background(
      Rectangle()
        .fill(Color(.systemBackground))
        .overlay(alignment: .leading) {
          Rectangle().fill(Color.black).frame(width: 4)
        }
    )
  }
}

private struct CheckpointStrip: View {
  private let items = [
    ("Web", "1.50", "live"),
    ("iOS", "0.4", "scan fit"),
    ("PNG", "KZG", "safe")
  ]

  var body: some View {
    HStack(spacing: 8) {
      ForEach(items, id: \.0) { item in
        VStack(alignment: .leading, spacing: 3) {
          Text(item.0)
            .font(.caption2.weight(.bold))
            .foregroundStyle(.secondary)
          Text(item.1)
            .font(.system(.headline, design: .serif, weight: .bold))
          Text(item.2)
            .font(.system(size: 9, weight: .semibold, design: .rounded))
            .foregroundStyle(.secondary)
            .lineLimit(1)
            .minimumScaleFactor(0.72)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.vertical, 7)
        .padding(.horizontal, 8)
        .background(Color(.systemBackground).opacity(0.78), in: RoundedRectangle(cornerRadius: 7, style: .continuous))
      }
    }
  }
}

private struct TimelineStrip: View {
  let points: [TimelinePoint]

  var body: some View {
    KZGCard(title: "交易日时间轴", subtitle: "505 文件窗口") {
      HStack(alignment: .bottom, spacing: 6) {
        ForEach(points) { point in
          VStack(spacing: 6) {
            Capsule()
              .fill(Color(red: 0.65, green: 0.52, blue: 0.34).opacity(0.45 + point.heat * 0.45))
              .frame(height: 18 + point.heat * 30)
            Text(point.label)
              .font(.system(size: 9, weight: .semibold, design: .rounded))
              .foregroundStyle(.secondary)
          }
          .frame(maxWidth: .infinity)
        }
      }
      SectionDivider()
      HStack {
        Text("已选")
          .font(.caption2.weight(.bold))
          .foregroundStyle(.secondary)
        Spacer()
        Text("2026-05-22 完整")
          .font(.caption.weight(.bold))
      }
    }
  }
}

private struct SummaryGrid: View {
  let snapshot: OptionSnapshot
  private let columns = [GridItem(.flexible()), GridItem(.flexible())]

  var body: some View {
    LazyVGrid(columns: columns, spacing: 8) {
      MetricTile(label: "当前交易日", value: snapshot.tradeDate, detail: "\(snapshot.totalRows) 行")
      MetricTile(label: "总成交量", value: snapshot.totalVolume, detail: "较前日 \(snapshot.volumeChange)", accent: Color(red: 0.10, green: 0.50, blue: 0.34))
      MetricTile(label: "权利金", value: snapshot.premium, detail: "变化 \(snapshot.premiumChange)", accent: Color(red: 0.58, green: 0.34, blue: 0.10))
      MetricTile(label: "Put/Call", value: snapshot.callPut, detail: "Call / Put", accent: Color(red: 0.42, green: 0.28, blue: 0.55))
    }
  }
}

private struct ReadBus: View {
  let snapshot: OptionSnapshot

  var body: some View {
    KZGCard(title: "今日读盘总线", subtitle: "免费开放核心日内结构") {
      VStack(alignment: .leading, spacing: 10) {
        Text(snapshot.headline)
          .font(.system(.body, design: .serif, weight: .semibold))
          .lineSpacing(3)
        HStack(spacing: 8) {
          MiniSignal(label: "量能", value: snapshot.volumeChange)
          MiniSignal(label: "权利金", value: snapshot.premiumChange)
          MiniSignal(label: "CP", value: snapshot.callPut)
        }
      }
    }
  }
}

private struct MiniSignal: View {
  var label: String
  var value: String

  var body: some View {
    VStack(spacing: 3) {
      Text(label).font(.caption2.weight(.bold)).foregroundStyle(.secondary)
      Text(value).font(.caption.weight(.bold))
    }
    .frame(maxWidth: .infinity)
    .padding(.vertical, 8)
    .background(Color.primary.opacity(0.045), in: RoundedRectangle(cornerRadius: 6, style: .continuous))
  }
}

private struct SectorBand: View {
  let sectors: [SectorMetric]

  var body: some View {
    KZGCard(title: "结构拆分", subtitle: "指数 ETF 个股") {
      VStack(spacing: 8) {
        ForEach(sectors) { sector in
          HStack(spacing: 10) {
            Text(sector.title)
              .font(.caption.weight(.bold))
              .frame(width: 34, alignment: .leading)
            GeometryReader { proxy in
              RoundedRectangle(cornerRadius: 4, style: .continuous)
                .fill(sector.color.opacity(0.18))
                .overlay(alignment: .leading) {
                  RoundedRectangle(cornerRadius: 4, style: .continuous)
                    .fill(sector.color)
                    .frame(width: proxy.size.width * widthRatio(sector.value))
                }
            }
            .frame(height: 12)
            Text(sector.value)
              .font(.caption.weight(.bold))
              .frame(width: 48, alignment: .trailing)
          }
          Text(sector.detail)
            .font(.caption2)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
      }
    }
  }

  private func widthRatio(_ value: String) -> Double {
    let number = Double(value.replacingOccurrences(of: "%", with: "")) ?? 0
    return min(max(number / 70, 0.06), 1)
  }
}

private struct IntradayCard: View {
  let buckets: [IntradayBucket]

  var maxVolume: Double {
    buckets.map(\.volume).max() ?? 1
  }

  var body: some View {
    KZGCard(title: "日内节奏", subtitle: "30 分钟桶 vs 20 日均值") {
      HStack(alignment: .bottom, spacing: 4) {
        ForEach(buckets) { bucket in
          VStack(spacing: 5) {
            Text(bucket.drift >= 0 ? "+\(Int(bucket.drift * 100))" : "\(Int(bucket.drift * 100))")
              .font(.system(size: 8, weight: .bold, design: .rounded))
              .foregroundStyle(bucket.drift >= 0.12 ? Color.red : Color.secondary)
            RoundedRectangle(cornerRadius: 4, style: .continuous)
              .fill(bucket.drift >= 0.12 ? Color(red: 0.66, green: 0.26, blue: 0.18) : Color(red: 0.20, green: 0.38, blue: 0.57))
              .frame(height: 28 + bucket.volume / maxVolume * 78)
            Text(bucket.time.prefix(2))
              .font(.system(size: 8, weight: .semibold, design: .rounded))
              .foregroundStyle(.secondary)
          }
          .frame(maxWidth: .infinity)
        }
      }
      SectionDivider()
      Text("峰值 09:30 · 压力桶 15:00 +29.8% · 尾盘 CP 降至 1.17")
        .font(.caption.weight(.semibold))
        .foregroundStyle(.secondary)
    }
  }
}

private struct RotationCard: View {
  let points: [RotationPoint]

  var body: some View {
    KZGCard(title: "轮动象限", subtitle: "量能变化 × 权利金变化") {
      ZStack {
        RoundedRectangle(cornerRadius: 7, style: .continuous)
          .fill(Color.primary.opacity(0.035))
        Path { path in
          path.move(to: CGPoint(x: 0, y: 100))
          path.addLine(to: CGPoint(x: 300, y: 100))
          path.move(to: CGPoint(x: 150, y: 0))
          path.addLine(to: CGPoint(x: 150, y: 200))
        }
        .stroke(Color.primary.opacity(0.10), lineWidth: 1)
        ForEach(points) { point in
          Text(point.symbol)
            .font(.system(size: 10, weight: .black, design: .rounded))
            .foregroundStyle(point.volumeChange >= 0 && point.premiumChange >= 0 ? Color.red : Color.secondary)
            .padding(.horizontal, 6)
            .padding(.vertical, 4)
            .background(Color(.systemBackground).opacity(0.86), in: Capsule())
            .position(x: map(point.volumeChange, min: -0.5, max: 4.5, size: 300), y: 200 - map(point.premiumChange, min: -0.8, max: 7.0, size: 200))
        }
      }
        .frame(height: 160)
      Text("右上量价同升，左下同步降温。iOS 版按 Web 五版本节奏同步。")
        .font(.caption2)
        .foregroundStyle(.secondary)
    }
  }

  private func map(_ value: Double, min: Double, max: Double, size: Double) -> Double {
    let clipped = Swift.min(Swift.max(value, min), max)
    return (clipped - min) / (max - min) * size
  }
}

private struct SymbolFocusCard: View {
  let symbols: [SymbolPulse]
  @Binding var selectedSymbol: String
  let selectedPulse: SymbolPulse

  var body: some View {
    KZGCard(title: "核心标的动量", subtitle: "手机端先做轻量聚焦") {
      ScrollView(.horizontal, showsIndicators: false) {
        HStack(spacing: 7) {
          ForEach(symbols) { item in
            Button {
              selectedSymbol = item.symbol
            } label: {
              VStack(alignment: .leading, spacing: 4) {
                Text(item.symbol)
                  .font(.headline.weight(.black))
                Text(item.volume)
                  .font(.caption.weight(.bold))
                Text("CP \(item.cp)")
                  .font(.caption2)
              }
              .foregroundStyle(selectedSymbol == item.symbol ? Color.white : Color.primary)
              .padding(8)
              .frame(width: 88, alignment: .leading)
              .background(
                RoundedRectangle(cornerRadius: 7, style: .continuous)
                  .fill(selectedSymbol == item.symbol ? item.tone.color : Color.primary.opacity(0.045))
              )
            }
            .buttonStyle(.plain)
          }
        }
      }
      VStack(alignment: .leading, spacing: 7) {
        Text(selectedPulse.symbol)
          .font(.system(.title, design: .serif, weight: .bold))
        HStack {
          MetricTile(label: "成交", value: selectedPulse.volume, detail: selectedPulse.premium, accent: selectedPulse.tone.color)
          MetricTile(label: "CP", value: selectedPulse.cp, detail: "最热合约同步中", accent: selectedPulse.tone.color)
        }
      }
    }
  }
}

#Preview {
  DashboardView(snapshot: OptionSnapshotProvider.latest)
}
