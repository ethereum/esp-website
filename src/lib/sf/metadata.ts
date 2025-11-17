import { createConnection, loginToSalesforce } from '.';

/**
 * Salesforce field metadata structure
 */
export interface SalesforceFieldMetadata {
  name: string;
  type: string;
  label: string;
  required: boolean;
  nillable: boolean;
  createable: boolean;
  updateable: boolean;
  picklistValues?: Array<{ value: string; label: string; active: boolean; defaultValue: boolean }>;
  length?: number;
  precision?: number;
  scale?: number;
  referenceTo?: string[];
  relationshipName?: string;
}

/**
 * Salesforce object metadata structure
 */
export interface SalesforceObjectMetadata {
  name: string;
  label: string;
  fields: SalesforceFieldMetadata[];
  recordTypeInfos?: Array<{
    recordTypeId: string;
    name: string;
  }>;
}

/**
 * Cache for metadata to avoid repeated API calls
 */
const metadataCache = new Map<string, SalesforceObjectMetadata>();

/**
 * Transform JSforce field metadata to our typed structure
 */
const transformFieldMetadata = (field: any): SalesforceFieldMetadata => {
  const transformed: SalesforceFieldMetadata = {
    name: field.name,
    type: field.type,
    label: field.label,
    required: !field.nillable && field.createable,
    nillable: field.nillable,
    createable: field.createable,
    updateable: field.updateable,
    length: field.length,
    precision: field.precision,
    scale: field.scale,
    referenceTo: field.referenceTo,
    relationshipName: field.relationshipName
  };

  // Transform picklist values if present
  if (field.picklistValues && Array.isArray(field.picklistValues)) {
    transformed.picklistValues = field.picklistValues.map((pv: any) => ({
      value: pv.value,
      label: pv.label,
      active: pv.active,
      defaultValue: pv.defaultValue
    }));
  }

  return transformed;
};

/**
 * Get Salesforce object metadata
 * @param objectType - The Salesforce object type (e.g., 'Application__c')
 * @param useCache - Whether to use cached metadata (default: true)
 * @returns Promise with object metadata
 */
export const getSalesforceObjectMetadata = async (
  objectType: string,
  useCache: boolean = true
): Promise<SalesforceObjectMetadata> => {
  // Check cache first
  if (useCache && metadataCache.has(objectType)) {
    return metadataCache.get(objectType)!;
  }

  const conn = createConnection();

  try {
    await loginToSalesforce(conn);

    // Use describe() to get object metadata
    const describeResult = await conn.sobject(objectType).describe();

    const metadata: SalesforceObjectMetadata = {
      name: describeResult.name,
      label: describeResult.label,
      fields: describeResult.fields.map(transformFieldMetadata),
      recordTypeInfos: describeResult.recordTypeInfos?.map(rt => ({
        recordTypeId: rt.recordTypeId,
        name: rt.name
      }))
    };

    // Cache the result
    metadataCache.set(objectType, metadata);

    return metadata;
  } catch (error) {
    console.error(`Error fetching metadata for ${objectType}:`, error);
    throw error;
  }
};

/**
 * Clear the metadata cache (useful for testing or when schema changes)
 */
export const clearMetadataCache = (): void => {
  metadataCache.clear();
};
