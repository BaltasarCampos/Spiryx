/**
 * T020 – BigDataCloud Reverse Geocoding API contract tests.
 *
 * Verifies the normalization contract between the geocoding provider response
 * and the location name string used by the UI.
 */
import { describe, expect, it } from "vitest";
import { normalizeLocationName, type BigdatacloudReverseGeocodingResponse } from "../normalizers";

describe("normalizeLocationName", () => {
  it('returns "locality, city, countryName" when all fields are present', () => {
    const payload: BigdatacloudReverseGeocodingResponse = {
      results: [{ locality: "Westminster", city: "London", countryName: "United Kingdom" }],
    };
    expect(normalizeLocationName(payload)).toBe("Westminster, London, United Kingdom");
  });

  it("returns only the city when countryName is absent", () => {
    const payload: BigdatacloudReverseGeocodingResponse = {
      results: [{ city: "London" }],
    };
    expect(normalizeLocationName(payload)).toBe("London");
  });

  it("returns only the countryName when city is absent", () => {
    const payload: BigdatacloudReverseGeocodingResponse = {
      results: [{ countryName: "United Kingdom" }],
    };
    expect(normalizeLocationName(payload)).toBe("United Kingdom");
  });

  it('returns "Current location" when the results array is empty', () => {
    const payload: BigdatacloudReverseGeocodingResponse = { results: [] };
    expect(normalizeLocationName(payload)).toBe("Current location");
  });

  it('returns "Current location" when results is missing', () => {
    const payload: BigdatacloudReverseGeocodingResponse = {};
    expect(normalizeLocationName(payload)).toBe("Current location");
  });

  it('returns "Current location" when locality, city and countryName are all empty strings', () => {
    const payload: BigdatacloudReverseGeocodingResponse = {
      results: [{ locality: "", city: "", countryName: "" }],
    };
    expect(normalizeLocationName(payload)).toBe("Current location");
  });
});
