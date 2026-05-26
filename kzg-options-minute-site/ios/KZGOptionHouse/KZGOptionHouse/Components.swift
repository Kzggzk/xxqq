import SwiftUI

struct KZGCard<Content: View>: View {
  var title: String
  var subtitle: String?
  @ViewBuilder var content: Content

  var body: some View {
    VStack(alignment: .leading, spacing: 11) {
      VStack(alignment: .leading, spacing: 3) {
        Text(title)
          .font(.system(.title3, design: .serif, weight: .semibold))
          .foregroundStyle(.primary)
        if let subtitle {
          Text(subtitle)
            .font(.system(.caption, design: .rounded))
            .foregroundStyle(.secondary)
        }
      }
      content
    }
    .padding(13)
    .background(
      RoundedRectangle(cornerRadius: 8, style: .continuous)
        .fill(Color(.secondarySystemBackground))
        .overlay(
          RoundedRectangle(cornerRadius: 8, style: .continuous)
            .stroke(Color.primary.opacity(0.08), lineWidth: 1)
        )
    )
  }
}

struct MetricTile: View {
  var label: String
  var value: String
  var detail: String
  var accent: Color = Color(red: 0.66, green: 0.43, blue: 0.15)

  var body: some View {
    VStack(alignment: .leading, spacing: 5) {
      Text(label)
        .font(.caption2.weight(.semibold))
        .foregroundStyle(.secondary)
      Text(value)
        .font(.system(.title2, design: .rounded, weight: .bold))
        .lineLimit(1)
        .minimumScaleFactor(0.72)
      Text(detail)
        .font(.caption2)
        .foregroundStyle(.secondary)
        .lineLimit(1)
        .minimumScaleFactor(0.75)
    }
    .frame(maxWidth: .infinity, alignment: .leading)
    .padding(10)
    .background(
      RoundedRectangle(cornerRadius: 7, style: .continuous)
        .fill(accent.opacity(0.08))
        .overlay(alignment: .leading) {
          Rectangle()
            .fill(accent)
            .frame(width: 3)
            .clipShape(RoundedRectangle(cornerRadius: 2, style: .continuous))
        }
    )
  }
}

struct SectionDivider: View {
  var body: some View {
    Rectangle()
      .fill(Color.primary.opacity(0.10))
      .frame(height: 1)
  }
}
